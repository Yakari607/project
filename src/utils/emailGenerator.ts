import { EmailTemplate, ToneType } from '../types/email';
import { professionalTemplates, toneModifiers } from './emailTemplates';

export const generateEmail = (
  template: EmailTemplate,
  tone: ToneType,
  variables: Record<string, string>
): string => {
  let content = Object.values(template.structure).join('\n\n');
  
  // Replace variables
  Object.entries(variables).forEach(([key, value]) => {
    content = content.replace(new RegExp(`{${key}}`, 'g'), value);
  });
  
  // Apply tone modifiers
  const modifier = toneModifiers[tone];
  if (modifier) {
    content = applyToneModifiers(content, modifier);
  }
  
  return content;
};

const applyToneModifiers = (
  content: string,
  modifier: typeof toneModifiers[keyof typeof toneModifiers]
): string => {
  let modified = content;
  
  // Apply greeting modifications
  modifier.greetings.forEach(greeting => {
    modified = modified.replace(/^(Cher|Bonjour)/, greeting);
  });
  
  // Apply closing modifications
  modifier.closings.forEach(closing => {
    modified = modified.replace(/(Cordialement|À bientôt)/, closing);
  });
  
  return modified;
};