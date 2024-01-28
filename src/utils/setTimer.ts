export function setTimer() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60 * 1);
  return time;
}
