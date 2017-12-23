/**
 * @todo This needs a massive rewrite to bring it up to speed with the latest
 *    js code style and perf tweaks
 */
import { window } from './window';

/*
 * shim layer with setTimeout fallback
 */
window.requestAnimationFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var _subscribers = {}; // list of subscriber callbacks
var _isRunning = false; // indicates if rAF is running
var _lastID = 1; // index for client id
var _prefix = 'RAF_'; // prefix for client id

/*
 * Update all subscribers
 */
var _updateSubscribers = function(elapsed) {
  for (let id in _subscribers) {
    _subscribers[id](elapsed);
  }
};

/*
 * Enter frame tick
 */
var _tick = function(elapsed) {
  _updateSubscribers(elapsed);
  if (_isRunning) window.requestAnimationFrame(_tick);
};

/**
 * Global request animation frame implementation that objects can subscribe to
 * @module
*/
class Raf {
  /**
   * Subscribe to enter frame tick
   * @param  {Function} callback Callback function called on tick
   * @return {String}            Client id
   */
  subscribe(callback) {
    if (typeof callback !== 'function') return;

    var id = _prefix + _lastID++;
    _subscribers[id] = callback;
    this.start();
    return id;
  }

  /**
   * Unsubscribe from tick
   * @param  {String} id Client id that was previously return on subscription
   */
  unsubscribe(id) {
    if (_subscribers[id]) {
      delete _subscribers[id];
    }
  }

  /**
   * Starts enter frame tick
   */
  start() {
    if (_subscribers.length < 1 || _isRunning) return; // no elements or already running -> don't do anything
    _isRunning = true;
    _tick();
  }

  /**
   * Stops enter frame tick
   */
  stop() {
    _isRunning = false;
  }
}

const raf = new Raf();

export default raf;
