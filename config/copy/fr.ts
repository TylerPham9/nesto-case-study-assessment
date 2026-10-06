import type { SignupCopy } from './types';

export const frSignupCopy = {
  path: '/fr/signup',
  heading: 'Créez un compte nesto',
  submit: 'Créez votre compte',
  login: 'Connexion',
  menuLoginButton: 'Connexion',
  language: 'EN',
  terms: "Conditions d'utilisation",
  privacy: 'politique de confidentialité',
  fieldLabels: {
    firstName: 'Prénom',
    lastName: 'Nom',
    phoneCountry: 'Phone number country',
    phone: 'Téléphone',
    region: "Province de l'achat",
    email: 'Courriel',
    password: 'Mot de passe',
    confirmPassword: 'Confirmation du mot de passe',
    consentCheckbox:
      'En cochant cette case, vous acceptez d’être contacté par les partenaires de nesto dans le but de vous proposer des produits financiers. Vous acceptez que nesto partage vos informations de demande hypothécaire avec ses partenaires, si nous ne sommes pas en mesure de vous fournir nos services. Vous pouvez vous désinscrire à tout moment.',
  },
  regionOptions: [
    'Alberta',
    'Colombie-Britannique',
    'Manitoba',
    'Nouveau-Brunswick',
    'Terre-Neuve-et-Labrador',
    'Nouvelle-Écosse',
    'Ontario',
    'Île-du-Prince-Édouard',
    'Québec',
    'Saskatchewan',
    'Territoires du Nord-Ouest',
    'Nunavut',
    'Yukon',
  ],
  errors: {
    required: 'Ce champ est obligatoire.',
    invalidName: 'Nom invalide',
    phoneInvalid: 'Valeur invalide.',
    emailInvalid: 'Courriel invalide',
    passwordTooShort: 'Minimum de 12 lettres requises',
    passwordComplexity:
      'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre',
  },
} satisfies SignupCopy;
