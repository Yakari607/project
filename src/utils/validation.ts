export const validateEmail = (email: string): string => {
  if (!email) {
    return 'L\'email est requis';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Veuillez entrer une adresse email valide';
  }
  
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Le mot de passe est requis';
  }
  
  if (password.length < 8) {
    return 'Le mot de passe doit contenir au moins 8 caractères';
  }
  
  return '';
};