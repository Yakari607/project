import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { useToast } from '../../hooks/useToast';
import { validateEmail, validatePassword } from '../../utils/validation';
import InputField from '../ui/InputField';

const Inscrip = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validation en temps réel
    if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === 'password') {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    } else if (name === 'firstName' || name === 'lastName') {
      setErrors((prev) => ({
        ...prev,
        [name]: value.trim() ? '' : 'Ce champ est obligatoire',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs
    const firstNameError = formData.firstName.trim() ? '' : 'Ce champ est obligatoire';
    const lastNameError = formData.lastName.trim() ? '' : 'Ce champ est obligatoire';
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (firstNameError || lastNameError || emailError || passwordError) {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Créer un utilisateur avec Firebase Authentication
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      showToast('Inscription réussie ! Vous pouvez vous connecter.', 'success');
      navigate('/login'); // Rediriger vers la page de connexion
    } catch (error: any) {
      showToast(`Erreur : ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Créer un compte</h1>
        <p className="text-gray-400">Rejoignez EmailEase dès aujourd'hui</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Prénom"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          disabled={isLoading}
          required
        />
        <InputField
          label="Nom"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          disabled={isLoading}
          required
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isLoading}
          required
        />
        <div className="relative">
          <InputField
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            disabled={isLoading}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#1E90FF] hover:bg-[#87CEFA] text-white py-3 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Inscription en cours...</span>
            </>
          ) : (
            <span>S'inscrire</span>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-400">
        Vous avez déjà un compte ?{' '}
        <button
          className="text-[#1E90FF] hover:text-[#87CEFA] transition-colors"
          onClick={() => navigate('/login')}
        >
          Connectez-vous
        </button>
      </p>
    </div>
  );
};

export default Inscrip;