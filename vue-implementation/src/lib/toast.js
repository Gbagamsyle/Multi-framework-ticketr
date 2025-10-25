let pushToast;

export function setPushFunction(fn) {
  pushToast = fn;
}

export function toast(msg, type = 'info', duration) {
  if (typeof pushToast !== 'function') {
    console.warn('Toast not initialized');
    return;
  }
  pushToast({ msg, type, duration });
}
