export const reformatIban = (iban) => {
  const replaceWhiteSpace = iban.replace(/\s/g, "");
  const reformattedAcc = `${replaceWhiteSpace.slice(
    0,
    4
  )} ${replaceWhiteSpace.slice(4, 8)} ${replaceWhiteSpace.slice(
    8,
    12
  )} ${replaceWhiteSpace.slice(12, 16)} ${replaceWhiteSpace.slice(16, 24)}`;
  console.log(reformattedAcc);
  return reformattedAcc;
};
