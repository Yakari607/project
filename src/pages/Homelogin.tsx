import React, { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';

/** --------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
type GmailPart = {
  partId: string;
  mimeType: string;
  filename?: string;
  body?: {
    size?: number;
    data?: string;
    attachmentId?: string;
  };
  parts?: GmailPart[];
  headers?: { name: string; value: string }[];
};

interface EmailType {
  id: string;
  subject: string;
  from: string;
  snippet: string;
  // Le HTML final, après remplacement des cid:
  htmlContent: string;
}

/** --------------------------------------------------------------------------
 * 1) Fonctions utilitaires de décodage
 * ------------------------------------------------------------------------- */

/** 
 * decodeBase64UrlUTF8
 * - Décodage en texte UTF-8 (pour la partie HTML). 
 * - Évite les caractères "Ã©" au lieu de "é".
 */
function decodeBase64UrlUTF8(base64Url: string): string {
  // Remplace base64URL par base64 standard
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  // Convertit la chaîne binaire ASCII en tableau d'octets
  const rawData = window.atob(base64);
  const bytes = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    bytes[i] = rawData.charCodeAt(i);
  }

  // Utilise TextDecoder pour interpréter en UTF-8
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(bytes);
}

/** 
 * decodeBase64UrlBinary
 * - Décodage binaire brut (pour les images inline).
 * - On renvoie une chaîne "ASCII 8 bits" afin de pouvoir la repasser dans btoa().
 */
function decodeBase64UrlBinary(base64Url: string): string {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return window.atob(base64); // renvoie une chaîne binaire
}

/** --------------------------------------------------------------------------
 * Composant principal
 * ------------------------------------------------------------------------- */
const HomeLogin: React.FC = () => {
  const [emails, setEmails] = useState<EmailType[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Récupère le scope + token depuis localStorage et appelle l’API Gmail
  useEffect(() => {
    const fetchEmails = async () => {
      const accessToken = localStorage.getItem('gmailAccessToken');
      if (!accessToken) {
        setErrorMessage('Token manquant. Veuillez vous reconnecter.');
        return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
        // 1) Lister les messages (on limite ici à la boîte principale)
        const listRes = await fetch(
          'https://www.googleapis.com/gmail/v1/users/me/messages?q=category:primary',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!listRes.ok) {
          throw new Error(
            `Erreur lors du listing des emails : ${await listRes.text()}`
          );
        }
        const listData = await listRes.json();
        const messages = listData.messages || [];

        // 2) Pour chaque email, on récupère les détails
        const detailedEmails: EmailType[] = await Promise.all(
          messages.slice(0, 5).map(async (msg: any) => {
            const msgRes = await fetch(
              `https://www.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );
            if (!msgRes.ok) {
              throw new Error(
                `Impossible de récupérer l'email ${msg.id} : ${await msgRes.text()}`
              );
            }
            const msgData = await msgRes.json();

            // Récupère Subject et From
            const subjectHeader = msgData.payload.headers.find(
              (h: any) => h.name === 'Subject'
            );
            const fromHeader = msgData.payload.headers.find(
              (h: any) => h.name === 'From'
            );

            const subject = subjectHeader ? subjectHeader.value : '(Sans sujet)';
            const from = fromHeader ? fromHeader.value : '(Expéditeur inconnu)';
            const snippet = msgData.snippet || '';

            // 3) Extraire la part HTML principale
            const htmlPart = findHtmlPart(msgData.payload);
            let htmlContent = '';

            /** -------------------------------------------------------------------------
             * MOD: Pour la partie HTML, on utilise "decodeBase64UrlUTF8" 
             *     afin d'afficher correctement les caractères accentués.
             * ------------------------------------------------------------------------*/
            if (htmlPart && htmlPart.body?.data) {
              htmlContent = decodeBase64UrlUTF8(htmlPart.body.data);
            }

            // 4) Gestion des inline attachments (cid) : remplace `cid:xxxx`
            // par des data:base64 si on les trouve
            if (msgData.payload.parts) {
              const updatedHtml = await replaceCidImages(
                msgData.payload,
                htmlContent,
                msg.id,
                accessToken
              );
              htmlContent = updatedHtml;
            }

            return {
              id: msg.id,
              subject,
              from,
              snippet,
              htmlContent,
            };
          })
        );

        setEmails(detailedEmails);
      } catch (err: any) {
        console.error(err);
        setErrorMessage(
          err.message || 'Erreur lors de la récupération des emails.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  /** 
   * Trouver la part "text/html" la plus pertinente 
   */
  const findHtmlPart = (payload: GmailPart): GmailPart | null => {
    if (payload.mimeType === 'text/html') return payload;
    if (payload.parts) {
      for (const part of payload.parts) {
        const found = findHtmlPart(part);
        if (found) return found;
      }
    }
    return null;
  };

  /**
   * Récupère un attachmentId et le transforme en data URI
   * pour les images inline.
   */
  const fetchAttachmentAsDataUri = async (
    messageId: string,
    attachmentId: string,
    mimeType: string,
    accessToken: string
  ): Promise<string> => {
    const attachRes = await fetch(
      `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!attachRes.ok) {
      console.warn('Erreur fetch attachment:', await attachRes.text());
      return '';
    }
    const attachData = await attachRes.json();
    const base64Data = attachData.data; // c'est du base64URL

    // MOD: On veut un binaire ASCII, pour pouvoir repasser en b64 standard.
    const rawData = decodeBase64UrlBinary(base64Data);

    const dataUri =
      'data:' +
      mimeType +
      ';base64,' +
      btoa(rawData); // on repasse en b64 standard
    return dataUri;
  };

  /**
   * Balaye toutes les parts pour voir s’il y a des images inline (content-id).
   * On remplace "cid:xxx" dans le HTML par un "data:image/png;base64,..." 
   * si on trouve l'attachment correspondant.
   */
  const replaceCidImages = async (
    payload: GmailPart,
    html: string,
    messageId: string,
    accessToken: string
  ): Promise<string> => {
    if (!payload.parts) return html;

    let updatedHtml = html;

    for (const part of payload.parts) {
      const contentIdHeader = part.headers?.find(
        (h) => h.name.toLowerCase() === 'content-id'
      );
      const dispositionHeader = part.headers?.find(
        (h) => h.name.toLowerCase() === 'content-disposition'
      );

      const isInline =
        dispositionHeader &&
        dispositionHeader.value.toLowerCase().includes('inline');

      if (contentIdHeader && isInline && part.body?.attachmentId) {
        const cidRaw = contentIdHeader.value.replace(/[<>]/g, '');
        const realMime = part.mimeType || 'image/png';

        const dataUri = await fetchAttachmentAsDataUri(
          messageId,
          part.body.attachmentId,
          realMime,
          accessToken
        );

        if (dataUri) {
          const cidNeedle = `cid:${cidRaw}`;
          updatedHtml = updatedHtml.replace(new RegExp(cidNeedle, 'g'), dataUri);
        }
      }

      if (part.parts) {
        updatedHtml = await replaceCidImages(part, updatedHtml, messageId, accessToken);
      }
    }
    return updatedHtml;
  };


  const openEmail = (email: EmailType) => {
    setSelectedEmail(email);
  };

  const closeEmail = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Boîte de réception Gmail
        </h1>

        {isLoading && (
          <div className="flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}

        {errorMessage && (
          <div className="text-red-400 text-center mb-4">{errorMessage}</div>
        )}

        {!isLoading && !errorMessage && emails.length === 0 && (
          <p className="text-center text-gray-400">Aucun email à afficher.</p>
        )}

        {/* Liste des emails */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {emails.map((email) => (
            <div
              key={email.id}
              className="bg-gray-800 rounded-lg shadow p-4 cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => openEmail(email)}
            >
              <h2 className="font-bold text-white line-clamp-1">
                {email.subject}
              </h2>
              <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                De : {email.from}
              </p>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                {email.snippet}
              </p>
            </div>
          ))}
        </div>

        {/* Modale affichant le contenu HTML (y compris les images) */}
        {selectedEmail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="relative bg-white text-gray-900 rounded-lg shadow-xl max-w-3xl w-full mx-4 p-6 overflow-auto max-h-[90vh]">
              <button
                onClick={closeEmail}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-2">{selectedEmail.subject}</h2>
              <p className="text-gray-600 text-sm mb-4">
                <strong>De :</strong> {selectedEmail.from}
              </p>
              {/* On insère directement l'HTML décodé + images inline */}
              <div
                className="prose prose-sm max-w-full"
                dangerouslySetInnerHTML={{ __html: selectedEmail.htmlContent }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeLogin;