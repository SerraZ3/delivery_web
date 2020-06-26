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
