// Types
export interface Email {
  id: number;
  from: string;
  subject: string;
  date: string;
  content: string;
  summary: string;
  isRead: boolean;
  isImportant: boolean;
}

export interface EmailTemplate {
  id: number;
  subject: string;
  prompt: string;
  response: string;
  category: 'customer-service' | 'business' | 'general';
}

// Sample email templates
export const sampleEmails: EmailTemplate[] = [
  {
    id: 1,
    subject: "Réponse à une réclamation client",
    prompt: "Client mécontent du retard de livraison, demande un remboursement",
    response: `Cher client,

Je vous prie d'accepter nos sincères excuses pour le retard de livraison de votre commande. Nous comprenons parfaitement votre frustration et prenons votre réclamation très au sérieux.

Nous avons vérifié le statut de votre commande et effectuons immédiatement le remboursement intégral. Le montant sera crédité sur votre compte dans un délai de 3 à 5 jours ouvrés.

Pour vous remercier de votre patience, nous souhaitons vous offrir un bon d'achat de 20% sur votre prochaine commande.

N'hésitez pas à nous contacter pour toute question supplémentaire.

Cordialement,
Le Service Client`,
    category: 'customer-service'
  },
  {
    id: 2,
    subject: "Proposition de collaboration",
    prompt: "Réponse positive à une demande de collaboration professionnelle",
    response: `Chère Madame Martin,

Je vous remercie pour votre message et l'intérêt que vous portez à notre entreprise.

Votre proposition de collaboration nous intéresse vivement. Je serais ravi d'organiser une réunion pour discuter plus en détail de ce projet d'envergure.

Pourriez-vous me proposer quelques créneaux qui vous conviendraient la semaine prochaine ?

Dans l'attente de votre retour, je reste à votre disposition.

Cordialement,
[Votre nom]`,
    category: 'business'
  },
  {
    id: 3,
    subject: "Confirmation de participation",
    prompt: "Confirmer sa présence à un événement professionnel",
    response: `Bonjour,

Je vous remercie pour votre invitation à la Conférence Tech 2024.

J'ai le plaisir de vous confirmer ma participation à cet événement qui s'annonce très enrichissant.

Pourriez-vous me faire parvenir le programme détaillé ainsi que les informations pratiques ?

Bien cordialement,
[Votre nom]`,
    category: 'general'
  }
];

// Sample inbox emails
export const inboxEmails: Email[] = [
  {
    id: 1,
    from: "client@example.com",
    subject: "Problème avec ma commande #12345",
    date: "2024-03-15T10:30:00",
    content: `Bonjour,

Je n'ai toujours pas reçu ma commande #12345 passée il y a une semaine. Le suivi indique qu'elle est "en transit" depuis 5 jours. C'est inadmissible !

Je demande un remboursement immédiat.

Cordialement,
Jean Dupont`,
    summary: "Client mécontent du retard de livraison de sa commande #12345, demande un remboursement",
    isRead: false,
    isImportant: true
  },
  {
    id: 2,
    from: "sarah.martin@example.com",
    subject: "Demande de collaboration",
    date: "2024-03-15T09:15:00",
    content: `Bonjour,

J'ai découvert votre entreprise récemment et je suis très intéressée par vos services. Notre société cherche un partenaire pour un projet d'envergure.

Pourrions-nous organiser une réunion pour en discuter ?

Bien cordialement,
Sarah Martin
Directrice Marketing`,
    summary: "Demande de réunion pour discuter d'une potentielle collaboration sur un projet important",
    isRead: true,
    isImportant: true
  },
  {
    id: 3,
    from: "newsletter@techconf.com",
    subject: "Invitation : Conférence Tech 2024",
    date: "2024-03-14T16:45:00",
    content: `Cher participant,

Nous avons le plaisir de vous inviter à la Conférence Tech 2024 qui se tiendra du 15 au 17 mai.

Programme et inscription sur notre site.

Cordialement,
L'équipe TechConf`,
    summary: "Invitation à la Conférence Tech 2024 du 15 au 17 mai",
    isRead: true,
    isImportant: false
  }
];