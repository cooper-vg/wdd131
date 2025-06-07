document.addEventListener('DOMContentLoaded', () => {
  const cardNumber = document.getElementById('card-number');
  const expMonth = document.getElementById('exp-month');
  const expYear = document.getElementById('exp-year');

  cardNumber.addEventListener('input', () => {
    let value = cardNumber.value.replace(/\D/g, '').substring(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    cardNumber.value = value;
  });

  [expMonth, expYear].forEach(field => {
    field.addEventListener('input', () => {
      field.value = field.value.replace(/\D/g, '').substring(0, 2);
    });
  });
});
