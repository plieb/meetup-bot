'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* module imports */
var agent = require('superagent-promise')(require('superagent'), _promise2.default);
var formatter = require('../formatter');

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(res, payload) {
    var replies;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('REGISTER OR UNREGISTER');

            replies = [];

            if (!(payload.rsvp === 'yes')) {
              _context.next = 8;
              break;
            }

            replies.push(formatter.formatMsg('You are now register to the event!'));
            _context.next = 6;
            return agent.post('https://api.meetup.com/' + payload.groupurl + '/events/' + payload.id + '/rsvps').query({ key: process.env.MEETUP_API_KEY }).query({ response: 'yes' });

          case 6:
            _context.next = 11;
            break;

          case 8:
            replies.push(formatter.formatMsg('You are now unsubscribed from the event'));
            _context.next = 11;
            return agent.post('https://api.meetup.com/' + payload.groupurl + '/events/' + payload.id + '/rsvps').query({ key: process.env.MEETUP_API_KEY }).query({ response: 'no' });

          case 11:
            return _context.abrupt('return', replies);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function register(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return register;
}();