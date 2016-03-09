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

// Loops over a DOM NodeList
function forEachNodeList(nodeList, todo) {
  for (var i = 0, l = nodeList.length; i < l; ++i) {
    var el = nodeList[i];
    todo(el,i);
  }
}

var buildObj = {

  handleEvent: function(e) {
    // The click is on the toggler or a descendant e.g. a <span> tag
    if ( ( e.target === this.toggler || this.toggler.contains(e.target) ) && e.type === 'click' ) this.toggleDropdown();
    // The click is outside
    else this.outsideCloseDropdown(e);
  },

  toggleDropdown: function toggleDropdown() {
      if ( hasClass(this.dropdown, 'is-open') ) {
        removeClass(this.dropdown, 'is-open');
        removeClass(this.toggler, 'is-active');
      } else {
        var allDropdowns = document.querySelectorAll(this.options.dropdownClass);
        // closes all dropdowns with the same class
        forEachNodeList(allDropdowns, function(el,i) {
          removeClass(el, 'is-open')
        });
        var allTogglers = document.querySelectorAll(this.options.togglerClass);
        // Removes the active class from the others togglers with the same class
        forEachNodeList(allTogglers, function(el,i) {
          removeClass(el, 'is-active');
        });
        // Opens the selected dropdown
        addClass(this.dropdown,'is-open');
        // Adds an active class to the toggler
        addClass(this.toggler,'is-active');
      }
  },

  outsideCloseDropdown: function outsideCloseDropdown(e) {
    if (
      this.dropdown !== e.target // the click is not on the dropdown
      && !this.dropdown.contains(e.target) // the click is not on a descendant of the dropdown
      && hasClass(this.dropdown, 'is-open')
    ) {
      removeClass(this.dropdown,'is-open');
      removeClass(this.toggler,'is-active');
    }
  },

  destroy: function destroy() {
    // Event Listeners removing
    if (this.options.outsideClose) document.removeEventListener('click', this);
    else this.toggler.removeEventListener('click', this);
  },

  // Init function
  init: function init(element) {
    // The dropdown container element
    this.container = document.querySelector(element);

    // The toggler element
    this.toggler = this.container.querySelector(this.options.togglerClass);

    // The dropdown element
    this.dropdown = this.container.querySelector(this.options.dropdownClass);

    // Event Listeners
    if (this.options.outsideClose) document.addEventListener('click', this);
    else this.toggler.addEventListener('click', this);

    // Public exposed methods
    return {
      toggleDropdown: this.toggleDropdown.bind(this),
      destroy: this.destroy.bind(this)
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