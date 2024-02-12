export function setTimer() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10 * 1);
  return time;
}
