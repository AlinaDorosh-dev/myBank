export const ageValidation = (birthDate) => {
    let today = new Date();
    let birthDateDate = new Date(birthDate);
    let age = today.getFullYear() - birthDateDate.getFullYear();
    let month = today.getMonth() - birthDateDate.getMonth();
    let day = today.getDate() - birthDateDate.getDate();
  
    if (age === 18) {
      if (month < 0) {
        age--;
      } else if (month === 0) {
        if (day < 0) {
          age--;
        }
      }
    }
  
    return age >= 18;
  };