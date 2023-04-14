// Regex for validate IBAN
export const IBAN_REGEX= /^ES\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}|ES\d{22}$/;

//Regex for validate Email
export const EMAIL_REGEX = /\S+@\S+\.\S+/;

//Regex for validate password
//8 to 24 characters .Must include uppercase and lowercase letters, a number and at least one special character.(!@#$%)
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;