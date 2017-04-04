'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = {
  'find-events': require('./find-events'),
  'get-upcoming': require('./get-upcoming'),
  'register': require('./register')
};

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(res, payload) {
    var currentAction, replies;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            currentAction = res.action && res.action.slug;

            console.log(currentAction);
            replies = [];

            if (!actions[currentAction]) {
              _context.next = 10;
              break;
            }

            console.log('Enter action');
            _context.next = 7;
            return actions[currentAction].default(res, payload);

          case 7:
            replies = _context.sent;
            _context.next = 11;
            break;

          case 10:
            if (res.reply()) {
              replies.push({
                type: 'text',
                content: res.reply()
              });
            } else {
              replies.push({
                type: 'text',
                content: 'Sorry I did not understand'
              });
            }

          case 11:
            return _context.abrupt('return', replies);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function handleAction(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return handleAction;
}();