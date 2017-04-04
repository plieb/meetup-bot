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
    var replies, cardsReplies, pictures, location, response, meetups, index, m;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('FIND EVENTS');

            replies = [];
            cardsReplies = [];
            pictures = [];
            location = res.getMemory('location');

            console.log('======================================');
            console.log(location);
            console.log('======================================');

            if (!location) {
              _context.next = 46;
              break;
            }

            replies.push(formatter.formatMsg('Looking for meetups near ' + location.formatted));
            _context.next = 12;
            return agent('GET', 'https://api.meetup.com/recommended/events?key=' + process.env.MEETUP_API_KEY + '&lat=' + location.lat + '&long=' + location.lng);

          case 12:
            response = _context.sent;
            meetups = response.body;

            if (!meetups.length) {
              _context.next = 45;
              break;
            }

            index = Math.floor(Math.random() * (meetups.length - 10) + 1);
            m = meetups.slice(index, index + 8);
            _context.next = 19;
            return agent('GET', 'https://api.meetup.com/' + m[0].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 19:
            pictures[0] = _context.sent;
            _context.next = 22;
            return agent('GET', 'https://api.meetup.com/' + m[1].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 22:
            pictures[1] = _context.sent;
            _context.next = 25;
            return agent('GET', 'https://api.meetup.com/' + m[2].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 25:
            pictures[2] = _context.sent;
            _context.next = 28;
            return agent('GET', 'https://api.meetup.com/' + m[3].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 28:
            pictures[3] = _context.sent;
            _context.next = 31;
            return agent('GET', 'https://api.meetup.com/' + m[4].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 31:
            pictures[4] = _context.sent;
            _context.next = 34;
            return agent('GET', 'https://api.meetup.com/' + m[5].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 34:
            pictures[5] = _context.sent;
            _context.next = 37;
            return agent('GET', 'https://api.meetup.com/' + m[6].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 37:
            pictures[6] = _context.sent;
            _context.next = 40;
            return agent('GET', 'https://api.meetup.com/' + m[7].group.urlname + '?key=' + process.env.MEETUP_API_KEY);

          case 40:
            pictures[7] = _context.sent;

            pictures.forEach(function (p, i) {
              var picture = p.body;
              if (picture.group_photo) {
                cardsReplies.push({
                  name: m[i].name,
                  city: location.formatted,
                  link: m[i].link,
                  picture: picture.group_photo.photo_link,
                  register: {
                    groupurl: m[i].group.urlname,
                    id: m[i].id,
                    rsvp: 'yes'
                  }
                });
              } else {
                cardsReplies.push({
                  name: m[i].name,
                  city: location.formatted,
                  link: m[i].link,
                  picture: picture.organizer.photo.photo_link,
                  register: {
                    groupurl: m[i].group.urlname,
                    id: m[i].id,
                    rsvp: 'yes'
                  }
                });
              }
            });
            replies.push(formatter.formatCardsReplies(cardsReplies));
            _context.next = 46;
            break;

          case 45:
            replies.push(formatter.formatMsg(res.reply()));

          case 46:
            return _context.abrupt('return', replies);

          case 47:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function findEvents(_x) {
    return _ref.apply(this, arguments);
  }

  return findEvents;
}();