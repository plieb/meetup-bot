'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* module imports */

exports.formatMsg = function (msg) {
  return {
    type: 'text',
    content: msg
  };
};

exports.formatQuickReplies = function (quickRp, res) {
  var elements = [];
  quickRp.forEach(function (elem) {
    elements.push({
      title: elem.name,
      value: elem.value
    });
  });
  return {
    type: 'quickReplies',
    content: {
      title: 'More information regarding ' + res.value,
      buttons: elements
    }
  };
};

exports.formatCardsReplies = function (cards) {
  var elements = [];
  cards.forEach(function (c) {
    elements.push({
      title: c.name,
      subtitle: c.city,
      imageUrl: c.picture,
      buttons: [{
        type: 'web_url',
        title: 'More Information',
        value: c.link
      }, {
        type: 'postback',
        title: c.register.rsvp === 'yes' ? 'RSVP' : 'Unregister',
        value: (0, _stringify2.default)({
          text: c.register.rsvp === 'yes' ? 'I want to RSPV for this meetup' : 'I want to unsubscribe',
          groupurl: c.register.groupurl,
          id: c.register.id,
          rsvp: c.register.rsvp
        })
      }]
    });
  });
  return {
    type: 'carouselle',
    content: elements
  };
};