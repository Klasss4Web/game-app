export const handlePhoneNumberClick = (phoneNumber: string) => {
  if (phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
  }
};