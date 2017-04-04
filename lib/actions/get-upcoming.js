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
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(res) {
    var replies, cardsReplies, pictures, response, meetups, m;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('GET UPCOMING');

            replies = [];
            cardsReplies = [];
            pictures = [];

            replies.push(formatter.formatMsg('Looking for upcoming meetups'));
            _context.next = 7;
            return agent('GET', 'https://api.meetup.com/self/events?key=' + process.env.MEETUP_API_KEY + '&status=upcoming');

          case 7:
            response = _context.sent;
            meetups = response.body;

            if (!meetups.length) {
              _context.next = 35;
              break;
            }

            m = meetups.slice(0, 5);

            if (!m[0]) {
              _context.next = 15;
              break;
            }

            _context.next = 14;
            return agent('GET', 'https://api.meetup.com/' + m[0].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 14:
            pictures[0] = _context.sent;

          case 15:
            if (!m[1]) {
              _context.next = 19;
              break;
            }

            _context.next = 18;
            return agent('GET', 'https://api.meetup.com/' + m[1].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 18:
            pictures[1] = _context.sent;

          case 19:
            if (!m[2]) {
              _context.next = 23;
              break;
            }

            _context.next = 22;
            return agent('GET', 'https://api.meetup.com/' + m[2].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 22:
            pictures[2] = _context.sent;

          case 23:
            if (!m[3]) {
              _context.next = 27;
              break;
            }

            _context.next = 26;
            return agent('GET', 'https://api.meetup.com/' + m[3].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 26:
            pictures[3] = _context.sent;

          case 27:
            if (!m[4]) {
              _context.next = 31;
              break;
            }

            _context.next = 30;
            return agent('GET', 'https://api.meetup.com/' + m[4].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 30:
            pictures[4] = _context.sent;

          case 31:
            pictures.forEach(function (p, i) {
              var picture = p.body;
              if (picture.group_photo) {
                cardsReplies.push({
                  name: m[i].name,
                  city: null,
                  link: m[i].link,
                  picture: picture.group_photo.photo_link,
                  register: {
                    groupurl: m[i].group.urlname,
                    id: m[i].id,
                    rsvp: 'no'
                  }
                });
              } else {
                cardsReplies.push({
                  name: m[i].name,
                  city: null,
                  link: m[i].link,
                  picture: picture.organizer.photo.photo_link,
                  register: {
                    groupurl: m[i].group.urlname,
                    id: m[i].id,
                    rsvp: 'no'
                  }
                });
              }
            });
            replies.push(formatter.formatCardsReplies(cardsReplies));
            _context.next = 36;
            break;

          case 35:
            replies.push(formatter.formatMsg(res.reply()));

          case 36:
            return _context.abrupt('return', replies);

          case 37:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function getUpcoming(_x) {
    return _ref.apply(this, arguments);
  }

  return getUpcoming;
}();