/**
 * Global wrapper for window and document browser variables
 *
 * import this whenever you need to access the `window`.
 * Helps with SSR
 */

let tempDocument = {
    documentElement: {},
    createElement: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    body: {},
    cookie: ''
  };
  let tempWindow = {
    fake: true,
    addEventListener: () => {},
    removeEventListener: () => {},
    scrollTo: () => {},
    setInterval: () => {},
    open: () => {},
    getComputedStyle: () => null,
    document: tempDocument,
    localStorage: {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null
    },
    location: {
      pathname: '',
      search: null
    },
    pageXOffset: 0,
    pageYOffset: 0,
    innerWidth: 1024,
    HTMLElement: Object
  };
  
  if (typeof window !== 'undefined') {
    tempWindow = window;
    tempDocument = document;
  }
  
  export { tempWindow as window, tempDocument as document };
  