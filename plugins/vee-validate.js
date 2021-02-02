/* eslint-disable no-useless-escape */
import Vue from 'vue'
import * as VeeValidate from 'vee-validate'
import { required, alpha_num as alphaNum, email, confirmed, length, numeric } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'
import ibanIsvalid from '~/plugins/iban'

// Module de validation des formulaires

// Configuration des classes CSS utilisées dans le DOM
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'form-error is-invalid'
    // ... https://logaretm.github.io/vee-validate/guide/state.html#css-classes
  }
})

// Champ requis
VeeValidate.extend('required', {
  ...required,
  message: 'Ce champ est obligatoire'
})

// Champ de longueur minimale
// extend('min', {
//   ...min
// })

// Longueur exacte
VeeValidate.extend('length', {
  ...length,
  message: 'Veuillez respecter la longueur demandée'
})

// Code postal
VeeValidate.extend('zip', {
  ...alphaNum,
  message: "Ce code postal n'est pas valide"
})

// Adresse e-mail
VeeValidate.extend('email', {
  ...email,
  message: 'Cette adresse ne semble pas valide'
})

// Adresse e-mail
VeeValidate.extend('confirmed', {
  ...confirmed,
  message: 'Ce champ requière une confirmation'
})

VeeValidate.extend('emailRequired', {
  ...required,
  message: 'formInput.emailRequired'
})

// Adresse e-mail
VeeValidate.extend('confirmPwd', {
  ...confirmed,
  message: 'formInput.passwordConfirmError'
})

VeeValidate.extend('validPwd', {
  // @ts-ignore
  validate(value) {
    // eslint-disable-next-line prettier/prettier
    const pwdRegexp = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\\]:;<>,.?~_+-=|]).{8,}$'
    return pwdRegexp.test(value)
  },
  message: 'formInput.passwordHintValid'
})

VeeValidate.extend('iban', {
  params: ['country'],
  // @ts-ignore
  validate(value, { country }) {
    return ibanIsvalid(value, country) !== false
  },
  message: 'resell.bank.errorIban'
})

// Nombre seulement
VeeValidate.extend('numeric', {
  ...numeric,
  message: 'Veuillez indiquer uniquement des chiffres'
})

VeeValidate.extend('checkPassword', {
  params: ['confirmPwd'],
  validate(value, { confirmPwd }) {
    return value === confirmPwd
  },
  message: 'accountChangePassword.passwordidentique'
})

// Correspondance de mots de passe
// https://logaretm.github.io/vee-validate/advanced/cross-field-validation.html#targeting-other-fields
VeeValidate.extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Les mots de passe ne correspondent pas'
})

// Adéquation complexité mot de passe
VeeValidate.extend('passwordrules', {
  validate(value) {
    // "8 caractères minimum, avec au moins une lettre majuscule, une lettre minuscule et un chiffre (0-9)"
    return value.length >= 8 && /[A-Z]+/.test(value) && /[a-z]+/.test(value) && /[0-9]+/.test(value)
  },
  message:
    'Votre mot de passe doit comprendre 8 caractères minimum, avec au moins une lettre majuscule, une lettre minuscule et un chiffre (0-9).'
})

// IBAN: défini dans les vues correspondantes pour ne pas surcharger ce fichier commun (voir aussi iban.ts)
// @NOTE À <ValidationProvider> est ajouté le paramètre slim (ou :slim="true") qui évite qu'un élément span soit généré (autour d'un paragraphe...). Pourrait nécessiter une version 3.3.1 ou 3.3.2 mini d'après https://github.com/logaretm/vee-validate/issues/2758

// import { localize } from 'vee-validate'
// localize('fr')

Vue.use(VeeValidate, {
  // inject: true,
  locale: 'fr'
})

Vue.component('ValidationObserver', VeeValidate.ValidationObserver)
Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
