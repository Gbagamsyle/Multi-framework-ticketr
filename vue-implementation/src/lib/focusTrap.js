// Small focus-trap utility used by modal dialogs.
// API: createFocusTrap(containerElement) -> { activate(onEscape), deactivate() }
export function createFocusTrap(container) {
  if (!container) throw new Error('createFocusTrap requires a DOM element')

  let previousActive = null
  let onEscapeHandler = null

  function getFocusableElements(root) {
    const selector = 'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    return Array.from(root.querySelectorAll(selector)).filter(el => el.offsetParent !== null)
  }

  function handleKey(e) {
    if (e.key === 'Escape') {
      if (typeof onEscapeHandler === 'function') onEscapeHandler()
      return
    }

    if (e.key !== 'Tab') return

    const focusable = getFocusableElements(container)
    if (focusable.length === 0) {
      e.preventDefault()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first || document.activeElement === container) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  return {
    activate(onEscape) {
      previousActive = document.activeElement
      onEscapeHandler = onEscape
      const focusable = getFocusableElements(container)
      if (focusable.length) focusable[0].focus()
      else {
        // make container focusable
        container.setAttribute('tabindex', '-1')
        container.focus()
      }
      document.addEventListener('keydown', handleKey)
    },
    deactivate() {
      document.removeEventListener('keydown', handleKey)
      onEscapeHandler = null
      try {
        if (previousActive && typeof previousActive.focus === 'function') previousActive.focus()
      } catch (e) {
        // ignore
      }
    }
  }
}
