export default function debounce(fun, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fun.apply(this, arguments);
    }, ms);
  };
}
