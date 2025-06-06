document.addEventListener('DOMContentLoaded', () => {
  const cardNumber = document.getElementById('card-number');
  const expiration = document.getElementById('expiration');

  // Format card number: 1234 5678 9012 3456
  cardNumber.addEventListener('input', () => {
    let value = cardNumber.value.replace(/\D/g, '').substring(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    cardNumber.value = value;
  });

  // Format expiration date: MM/YY
  expiration.addEventListener('input', () => {
    let value = expiration.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 3) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    expiration.value = value;
  });
});
