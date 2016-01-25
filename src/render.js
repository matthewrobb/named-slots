import polyfill from './polyfill';
import mapPatch from './internal/map/patch';

// Simple renderer that proxies another renderer. It will polyfill if not yet
// polyfilled, or simply run the renderer. Initial content is taken into
// consideration.
export default function (fn) {
  return function (elem) {
    if (mapPatch.get(elem)) {
      fn(elem);
    } else {
      const ch = [].slice.call(elem.childNodes);
      fn(elem);
      polyfill(elem);
      ch.forEach(elem.appendChild(ch));
    }
  };
}