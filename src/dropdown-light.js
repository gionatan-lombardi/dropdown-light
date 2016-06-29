/*!
 * dropdown-light 
 * v1.0.0
 * (https://github.com/gionatan-lombardi/dropdown-light)
 * Copyright (c) 2016 Gionatan Lombardi
 * Licensed under the MIT license
 */

(function(window) {

'use strict';

// Utility Functions

//http://youmightnotneedjquery.com/#deep_extend
function extend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object')
          out[key] = extend(out[key], obj[key]);
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
}

// http://youmightnotneedjquery.com/#add_class
function addClass(el, className) {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
}

// http://youmightnotneedjquery.com/#remove_class
function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

// http://youmightnotneedjquery.com/#has_class
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className);
  else
    return ( new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className) );
}

// http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

// Loops over a DOM NodeList
function forEachNode(nodeList, todo) {
  for (var i = 0, l = nodeList.length; i < l; ++i) {
    var el = nodeList[i];
    // The callback takes as params the current element and the index
    var o = todo(el,i);
    // If the callback returns the string "break" the loop'll be stopped
    if ( o === "break") break;
  }
  return nodeList;
}

var buildObj = {

  handleEvent: function(e) {
    var self = this;
    var outsideClose = true;
    // The click is on the toggler or a descendant e.g. a <span> tag
    forEachNode(this.togglers, function (el, i) {
      if ( ( e.target === el || el.contains(e.target) ) && e.type === 'click' ) {
        var toggler = el;
        var dropdown = el.parentNode.querySelector(self.options.dropdownClass);
        self.toggleDropdown(toggler, dropdown);
        outsideClose = false;
      }
    });
    // The click is outside
    if (outsideClose) this.outsideCloseDropdown(e);
  },

  toggleDropdown: function toggleDropdown(toggler, dropdown) {
      if ( hasClass(dropdown, 'is-open') ) {
        removeClass(dropdown, 'is-open');
        removeClass(toggler, 'is-active');
        // Calls the callback provided by the plugin user in the options
        this.publicCallback(this.options.onClose);
      } else {
        var allDropdowns = document.querySelectorAll(this.elementClass + " " + this.options.dropdownClass);
        // closes all dropdowns with the same class
        forEachNode(allDropdowns, function(el,i) {
          removeClass(el, 'is-open')
        });
        var allTogglers = document.querySelectorAll(this.elementClass + " " + this.options.togglerClass);
        // Removes the active class from the others togglers with the same class
        forEachNode(allTogglers, function(el,i) {
          removeClass(el, 'is-active');
        });
        // Opens the selected dropdown
        addClass(dropdown,'is-open');
        // Adds an active class to the toggler
        addClass(toggler,'is-active');
        // Calls the callback provided by the plugin user in the options
        this.publicCallback(this.options.onOpen);
      }
  },

  outsideCloseDropdown: function outsideCloseDropdown(e) {
    var self = this;
    forEachNode(this.dropdowns, function (el, i) {
      if (
        el !== e.target // the click is not on the dropdown
        && !el.contains(e.target) // the click is not on a descendant of the dropdown
        && hasClass(el, 'is-open')
      ) {
        // The Dropdown
        removeClass(el,'is-open');
        // The toggler
        removeClass(el.parentNode.querySelector(self.options.togglerClass),'is-active');
        // Calls the callback provided by the plugin user in the options
        this.publicCallback(this.options.onClose);
      }
    });
  },

  publicCallback: function onOpen(fn) {
    if(typeof fn === 'undefined')
      return;
    else if(isFunction(fn))
      fn();
    else
      throw new Error('dropdown-ligh - onOpen: the argument must be a function.');
  },

  // Public Exposed methods
  
  toggle: function toggle(index) {
    var self = this;
    var togglers = document.querySelector(self.elementClass + " " + self.options.togglerClass);
    var toggledDropdown = {};
    forEachNode(self.togglers, function (el, i) {
      var dropdown = el.parentNode.querySelector(self.options.dropdownClass); 
      if ( hasClass(dropdown, 'is-open') ) {
        removeClass(dropdown, 'is-open');
        removeClass(el, 'is-active');
        // Calls the callback provided by the plugin user in the options
        self.publicCallback(self.options.onClose);
        toggledDropdown.el = dropdown;
        toggledDropdown.index = i;
        return "break";
      }
    });
    var usedIndex = typeof index === "number" ? parseInt(index) : typeof toggledDropdown.index === "undefined" ? 0 : null;
    if (usedIndex !== null && toggledDropdown.index !== usedIndex) {
      var currentToggler = self.togglers[usedIndex]
      if (typeof currentToggler !== "undefined") {
        var currentDropdown = currentToggler.parentNode.querySelector(self.options.dropdownClass);
        self.toggleDropdown(currentToggler, currentDropdown);
        toggledDropdown.el = currentDropdown;
        toggledDropdown.index = usedIndex;
      } else {
        toggledDropdown.el = false;
      }
    }
    return toggledDropdown.el;
  },

  close: function close() {
    var self = this;
    var closedDropdown;
    forEachNode(self.togglers, function (el, i) {
      var dropdown = el.parentNode.querySelector(self.options.dropdownClass); 
      if ( hasClass(dropdown, 'is-open') ) {
        removeClass(dropdown, 'is-open');
        removeClass(el, 'is-active');
        // Calls the callback provided by the plugin user in the options
        self.publicCallback(self.options.onClose);
        closedDropdown = dropdown;
        return "break";
      }
    });
    return closedDropdown;
  },

  destroy: function destroy() {
    var self = this;
    // Event Listeners removing
    if (self.options.outsideClose) document.removeEventListener('click', self);
    else {
      forEachNode(self.togglers, function (el, i) {
        el.removeEventListener('click', self);
      });
    } 
  },

  // Init function
  init: function init(element) {
    var self = this;

    // The container string class
    self.elementClass = element;

    // All the togglers
    self.togglers = document.querySelectorAll(element + " " + self.options.togglerClass);

    // All dropdowns
    self.dropdowns = document.querySelectorAll(element + " " + self.options.dropdownClass);

    // Event Listeners
    if (self.options.outsideClose) document.addEventListener('click', self);
    else {
      forEachNode(self.togglers, function (el, i) {
        el.addEventListener('click', self);
      });
    } 

    // Public exposed methods
    return {
      destroy: this.destroy.bind(this),
      close: this.close.bind(this),
      toggle: this.toggle.bind(this)
    }
  },

};

// The Plugin Function (init)
function dropdownLight(element, cstOptions) {

  var defaultOptions = {
    dropdownClass: '.dropdownMenu',
    togglerClass: '.dropdownToggler',
    outsideClose: true
  }
  var options = extend(defaultOptions, cstOptions);
  var o = Object.create(buildObj);
  o.options = options;

  return o.init(element);

};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( dropdownLight );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = dropdownLight;
} else {
  // browser global
  window.dropdownLight = dropdownLight;
}

})( window );