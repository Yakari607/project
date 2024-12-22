import React, { useState } from 'react';
import { Copy, Check, Edit, Send } from 'lucide-react';
import EmailEditor from './EmailEditor';

interface EmailPreviewProps {
  content: string;
  onSend?: (content: string) => void; // Option pour personnaliser l'envoi
  title?: string; // Option pour modifier le titre
}

const EmailPreview: React.FC<EmailPreviewProps> = ({
  content,
  onSend,
  title = "Aperçu de l'email", // Valeur par défaut
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSentMessage, setShowSentMessage] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la copie dans le presse-papiers', error);
    }
  };

  const handleSend = (emailContent: string) => {
    if (onSend) {
      onSend(emailContent);
    }
    setShowSentMessage(true);
    setTimeout(() => setShowSentMessage(false), 3000);
  };

  return (
    <div
      style={{
        backgroundColor: 'rgba(31, 41, 55, 0.6)',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid rgba(75, 85, 99, 0.8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#fff' }}>{title}</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Bouton Copier */}
          <button
            onClick={handleCopy}
            aria-label="Copier le contenu de l'email"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              padding: '8px 12px',
              borderRadius: '25px',
              backgroundColor: copied ? '#22c55e' : 'transparent',
              color: copied ? '#fff' : '#9ca3af',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {copied ? <Check style={{ width: '16px', height: '16px' }} /> : <Copy style={{ width: '16px', height: '16px' }} />}
            <span>{copied ? 'Copié !' : 'Copier'}</span>
          </button>

          {/* Bouton Modifier */}
          <button
            onClick={() => setIsEditing(true)}
            aria-label="Modifier l'email"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              padding: '8px 12px',
              borderRadius: '25px',
              backgroundColor: 'transparent',
              color: '#9ca3af',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#9ca3af')}
          >
            <Edit style={{ width: '16px', height: '16px' }} />
            <span>Modifier</span>
          </button>

          {/* Bouton Envoyer */}
          <button
            onClick={() => handleSend(content)}
            aria-label="Envoyer l'email"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              padding: '8px 16px',
              borderRadius: '25px',
              backgroundColor: '#1E90FF',
              color: '#fff',
              cursor: 'pointer',
              transition: 'transform 0.2s, background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#87CEFA')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1E90FF')}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Send style={{ width: '16px', height: '16px' }} />
            <span>Envoyer</span>
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div style={{ padding: '24px' }}>
        {content ? (
          <div
            style={{
              whiteSpace: 'pre-wrap',
              color: '#e5e7eb',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {content}
          </div>
        ) : (
          <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>
            L'email généré apparaîtra ici...
          </p>
        )}
      </div>

      {/* Éditeur d'email */}
      {isEditing && (
        <EmailEditor
          initialContent={content}
          onClose={() => setIsEditing(false)}
          onSend={handleSend}
        />
      )}

      {/* Message de confirmation d'envoi */}
      {showSentMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            backgroundColor: '#22c55e',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Check style={{ width: '16px', height: '16px' }} />
          <span>Email envoyé avec succès !</span>
        </div>
      )}
    </div>
  );
};

export default EmailPreview;
