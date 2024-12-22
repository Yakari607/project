import { EmailTemplate } from '../types/email';

export const professionalTemplates: Record<string, EmailTemplate> = {
  apology: {
    subject: "Réponse à votre réclamation",
    structure: {
      greeting: "Cher(e) {name},",
      acknowledgment: "Je vous remercie d'avoir pris le temps de nous faire part de votre retour concernant {issue}.",
      apology: "Nous tenons à vous présenter nos sincères excuses pour les désagréments occasionnés.",
      solution: "Afin de remédier à cette situation, nous {action}.",
      compensation: "En guise de compensation, nous souhaitons vous offrir {offer}.",
      closing: "Nous espérons sincèrement regagner votre confiance.",
      signature: "\nCordialement,\n{sender}"
    }
  },
  followUp: {
    subject: "Suivi de notre précédent échange",
    structure: {
      greeting: "Bonjour {name},",
      context: "Je me permets de revenir vers vous concernant {topic}.",
      mainPoint: "Suite à notre dernier échange, {context}.",
      action: "Nous souhaiterions {request}.",
      closing: "Je reste à votre disposition pour toute information complémentaire.",
      signature: "\nBien cordialement,\n{sender}"
    }
  }
};

export const toneModifiers = {
  formal: {
    greetings: ["Je vous prie d'agréer", "Je vous prie de recevoir"],
    closings: ["l'expression de mes salutations distinguées", "mes sincères salutations"]
  },
  friendly: {
    greetings: ["Bonjour", "Cher(e)"],
    closings: ["Bien cordialement", "À bientôt"]
  }
};