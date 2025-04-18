export const AppText = {
   email_input: "Entrez votre email",
   password_input: "Entrez votre mot de passe",
   confirm_password_input: "Veuillez ressaisir votre mot de passe",
   first_name_input: "Entrez votre prénom",
   last_name_input: "Entrez votre nom",
   address_input: "Entrez votre adresse",
   phone_number_input: "Entrez votre numero de telephone",
   password_forgetten: "Mot de passe oublié?",
   connexion_button: "Connexion",
   responsable_button: "Responsable",
   parent_button: "Parent",
   educatrice_button: "Educatrice",

   password_error: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial",
   password_required: "Le mot de passe est requis",
   email_error: "L'email doit être au format valide",
   email_required: "L'email est requis",
   phone_number_error: "Le numéro de téléphone doit contenir 10 chiffres",
}

export const AppRegex = {
   email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
   password: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
   phoneNumber: /^\d{10}$/
}
