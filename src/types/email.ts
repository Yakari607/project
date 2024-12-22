export interface EmailTemplate {
  subject: string;
  structure: Record<string, string>;
}

export type ToneType = 'formal' | 'friendly';

export interface EmailData {
  id: string;
  subject: string;
  content: string;
  timestamp: number;
  tone: ToneType;
}

export interface EmailGeneratorConfig {
  template: EmailTemplate;
  tone: ToneType;
  variables: Record<string, string>;
}