export function debounce(func, wait) {
  let timeout;
  return function() {
      const context = this, args = arguments;
      return new Promise((resolve, reject) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args)
                .then(resolve)
                .catch(reject);
        }, wait);
      });
  };
}
