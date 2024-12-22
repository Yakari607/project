import { useNavigate } from 'react-router-dom';
import { sampleEmails } from '../utils/sampleData';
import EmailTemplate from '../components/templates/EmailTemplate';

const Templates = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (prompt: string) => {
    navigate('/generator', { state: { prompt } });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-medium text-white mb-8">Modèles d'emails</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleEmails.map((email) => (
            <EmailTemplate
              key={email.id}
              subject={email.subject}
              prompt={email.prompt}
              response={email.response}
              onUse={() => handleUseTemplate(email.prompt)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;