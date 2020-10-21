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

export const locationConfig = {
  body: {
    deleteTooltip: 'Deletar',
    addTooltip: 'Adicionar',
    editTooltip: 'Editar',
    editRow: {
      deleteText: 'Deseja realmente deletar esse item?',
      cancelTooltip: 'Cancelar',
      saveTooltip: 'Confirmar',
    },
  },
  pagination: {
    labelRowsSelect: 'Linhas',
    firstTooltip: 'Primeira página',
    firstAriaLabel: 'Primeira página',
    previousAriaLabel: 'Página anterior',
    previousTooltip: 'Página anterior',
    nextAriaLabel: 'Próxima página',
    nextTooltip: 'Próxima página',
    lastAriaLabel: 'Última página',
    lastTooltip: 'Última página',
    labelDisplayedRows: '{from}-{to} de {count}',
    rowsPerPageOptions: [5, 10, 20, 30],
  },
  toolbar: {
    searchTooltip: 'Pesquisar',
    searchAriaLabel: 'Pesquisar',
    searchPlaceholder: 'Pesquisar',
  },
  header: {actions: 'Ações'},
};
