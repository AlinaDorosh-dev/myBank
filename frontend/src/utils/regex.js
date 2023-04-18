// Regex for validate IBAN
export const IBAN_REGEX =
  /^ES\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}|ES\d{22}$/;

//Regex for validate Email
export const EMAIL_REGEX = /\S+@\S+\.\S+/;

//Regex for validate password
//8 to 24 characters .Must include uppercase and lowercase letters, a number and at least one special character.(!@#$%)
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;

//Regex for validate phone
export const PHONE_REGEX = /^\d{9}$/;

//Regex for validate DNI
export const DNI_REGEX = /^\d{8}[a-zA-Z]$/;

//Regex for validate NIE
export const NIE_REGEX = /^[XYZ]\d{7}[a-zA-Z]$/;

//Regex for validate ZIPCODE
export const ZIPCODE_REGEX = /^\d{5}$/;

//Regex for validate NAME
export const NAME_REGEX = /^[A-Z][a-zA-z]{2,23}$/;

//Regex for validate amount
export const AMOUNT_REGEX = /^\d{1,10}(\.\d{1,2})?$/;
