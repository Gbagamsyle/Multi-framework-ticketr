let pushFn = null

export function setPushFunction(fn) {
  pushFn = fn
}

/**
 * Push a new toast message to the UI
 * @param {Object} toast
 * @param {string} toast.msg - The message to display
 * @param {'success' | 'error' | 'warning' | 'info'} [toast.type='info']
 * @param {number} [toast.duration=4000]
 */
export function pushToast(toast) {
  if (typeof pushFn === 'function') {
    pushFn(toast)
  } else {
    console.warn('Toast system not ready yet.')
  }
}
