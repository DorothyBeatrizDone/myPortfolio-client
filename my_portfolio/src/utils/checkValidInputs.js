//Perform validation
  const isPasswordMatch = (p1, p2) =>{
    return p1 === p2;
  }

  const isValidPhoneNumber = (phone) => {
    const phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[-\s.]?\d{3}[-\s.]?\d{4}$/;
    if (!phonePattern.test(phone)) {
      //console.log(isValidPhoneNumber(phone));
      alert('Please enter a valid phone number.');
      //return true;
      return false;
    }
    return true;
  };

const isValidEmail = (email) => {
    const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;
    if (!emailPattern.test(email.trim())) {
        alert("Please enter a valid email address.");
        return false;
    }
    return true;
}

  export {
    isValidEmail,
    isPasswordMatch,
    isValidPhoneNumber
  }