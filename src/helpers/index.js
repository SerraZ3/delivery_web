export const convertDate = (date) => {
  function checkZero(data) {
    if (data.length === 1) {
      data = '0' + data;
    }
    return data;
  }
  let newDate = new Date(date);
  let day = newDate.getDate() + '';
  let month = newDate.getMonth() + 1 + '';
  let year = newDate.getFullYear() + '';
  let hour = newDate.getHours() + '';
  let minutes = newDate.getMinutes() + '';
  let seconds = newDate.getSeconds() + '';

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);

  return (
    hour + ':' + minutes + ':' + seconds + ' ' + day + '/' + month + '/' + year
  );
};
export const convertDateBirthDay = (date) => {
  function checkZero(data) {
    if (data.length === 1) {
      data = '0' + data;
    }
    return data;
  }
  let newDate = new Date(date);
  let day = newDate.getDate() + '';
  let month = newDate.getMonth() + 1 + '';
  let year = newDate.getFullYear() + '';

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);

  return day + '/' + month + '/' + year;
};

export const formatMoney = (money) =>
  parseFloat(money).toFixed(2).toString().replace('.', ',');

export const getPaymentType = (data) => {
  switch (data) {
    case 'cash':
      return 'Dinheiro';
    case 'credit_card':
      return 'Cartão de crédito';
    case 'debit_card':
      return 'Cartão de débito';
    default:
      return 'Error';
  }
};
