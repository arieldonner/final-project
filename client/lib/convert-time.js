export default function convertTime(time) {
  const newTime = time.slice(0, 5);
  let hours = newTime.slice(0, 2);
  const minutes = newTime.slice(3);
  let amOrPm = 'AM';
  if (hours < 10) {
    hours = hours.slice(1, 2);
  }
  if (hours > 12) {
    hours = hours % 12;
    amOrPm = 'PM';
    if (hours === 0) {
      hours = 12;
    }
  }
  const finalTime = hours + ':' + minutes + amOrPm;
  return finalTime;
}
