export default function phoneValidation(str) {
  const phoneNumberValidation = (phoneNumber) => {
    // return phoneNumber.match(/\d/g).length === 10;
    return phoneNumber.length === 10;
  };

  return phoneNumberValidation(str) === true;
}
