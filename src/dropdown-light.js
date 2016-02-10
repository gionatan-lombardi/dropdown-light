var $ = require('jquery');

/*!
 * dropdown-light 
 * v1.0.0
 * (https://github.com/gionatan-lombardi/dropdown-light)
 * Copyright (c) 2016 Gionatan Lombardi
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Dropdown Light requires jQuery')
}

(function($) {

  'use strict';

  $.fn.dropdownLight = function( options ) {
   
    var self = this;

    // Extend the default options with those provided.
    self.opts = $.extend( {}, $.fn.dropdownLight.defaults, options );

    this.each( function () {

      var $toggler = $(this);
      var $dropdown;

      function toggleDropdown(e) {
        if ( isOpen( $dropdown ) ) {
          $dropdown.removeClass('is-open');
          $(this).removeClass('is-active');
        } 
        else {
          // closes all dropdowns with the same class
          $(self.opts.dropdownClass).removeClass('is-open');
          // Removes the active class from the others togglers with the same class
          $(self.opts.togglerClass).removeClass('is-active');
          // Opens the selected dropdown
          $dropdown.addClass('is-open');
          // Adds an active class to the toggler
          $(this).addClass('is-active');
        } 
        e.stopPropagation();
      };

      function outsideCloseDropdown(e) {
        if (!$toggler.is(e.target) // the click is not on the toggler
          && $dropdown.has(e.target).length === 0 // the click is not on a descendant of the select
          && isOpen( $dropdown )
        ) {
          $dropdown.removeClass('is-open');
          $toggler.removeClass('is-active');
        }
      };

      // UTILITY FUNCTIONS
      function isOpen( $elem ) {
        if ( $elem.hasClass('is-open') ) return true;
        else return false;
      };

      // Public function
      function init() {
        $dropdown = $toggler.siblings( $(self.opts.dropdownClass) );
        // Event Listeners
        $toggler.on( 'click.dropdownLight', toggleDropdown);
        $(document).on("click.dropdownLight", outsideCloseDropdown);
      };

      init();

    });

  };

  // Default Plugin Options
  $.fn.dropdownLight.defaults = {
    dropdownClass: '.dropdownMenu',
    togglerClass: '.dropdownToggler'
  };

})(jQuery);
