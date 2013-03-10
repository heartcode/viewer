/*
  * Viewer.App.Navigation
  *
  * The Navigation module of the viewer
  * This module is responsible for the navigation between photos in the viewer
  *
  *
  * 2013 Robert Pataki [robert@robertpataki.com]
  *
*/

/*global Utils log $ Viewer*/

Utils.namespace('Viewer.App.Navigation');
Viewer.App.Navigation = (function (options) {
  'use strict';


  
/*****************************************
 * Private fields
**********************/

  var container = options.container,
      name = 'navigation',
      template = '<div class="viewer_navigation"><div class="button previous"><div class="gfx"><i class="icon-angle-left"></i></div><div class="hit_area"></div></div><div class="button next"><div class="gfx"><i class="icon-angle-right"></i></div><div class="hit_area"></div></div>',
      nextButton,
      prevButton,
      view,
      events = Viewer.App.EventAggregator,



/*****************************************
 * Private methods
**********************/

  /*
  * Handles the next/previous button clicks and triggers a custom event
  * @method onButtonClick
  * @see Viewer.App.Navigation.Events
  * @param event {Object}
  * @private
  */
  onButtonClick = function onButtonClick(event) {
    if (event.currentTarget === prevButton[0]) {
      events.trigger(Viewer.App.Navigation.Events.PREV_BUTTON_CLICK);
    } else {
      events.trigger(Viewer.App.Navigation.Events.NEXT_BUTTON_CLICK);
    }
  },

  /*
  * Handles the keyboard input
  * @method onKeyUp
  * @private
  * @param event {Object}
  */
  onKeyUp = function onKeyUp(event) {
    switch(event.keyCode) {
      case Viewer.App.Navigation.Keyboard.KEY_LEFT:
        prevButton.click();
      break;
      case Viewer.App.Navigation.Keyboard.KEY_RIGHT:
        nextButton.click();
      break;
    }
  },

  /*
  * Sets up the navigation instance
  * @method setup
  */
  setup = (function setup() {
    view = $(template).appendTo(container);

    nextButton = view.find('.button.next');
    prevButton = view.find('.button.previous');

    view.on('click.Viewer.App.Navigation', '.button', onButtonClick);
    $(document).on('keyup.Viewer.App.Navigation', onKeyUp);
  })(),


/*****************************************
 * Public methods
**********************/

  /*
  * Handles the browser resize
  * @method resize
  */
  resize = function resize() {
    
  },

  /*
  * Enables the previous button
  * @method enablePreviousButton
  */
  enablePreviousButton = function enablePreviousButton() {
    prevButton.removeClass('disabled');
  },

  /*
  * Disables the previous button
  * @method disablePreviousButton
  */
  disablePreviousButton = function disablePreviousButton() {
    prevButton.addClass('disabled');
  },

  /*
  * Enables the next button
  * @method enableNextButton
  */
  enableNextButton = function enableNextButton() {
    nextButton.removeClass('disabled');
  },

  /*
  * Disables the next button
  * @method disableNextButton
  */
  disableNextButton = function disableNextButton() {
    nextButton.addClass('disabled');
  };


/*****************************************
 * Public static fields
**********************/
  
  // Custom events
  Viewer.App.Navigation.Events = {
    NEXT_BUTTON_CLICK: 'Viewer.App.Navigation.onNextButtonClick',
    PREV_BUTTON_CLICK: 'Viewer.App.Navigation.onPrevButtonClick'
  },

  // Keyboard codes
  Viewer.App.Navigation.Keyboard = {
    KEY_RIGHT: 39,
    KEY_LEFT: 37
  };


/*****************************************
 * Public interface
**********************/

  return {
    resize: resize,
    enablePreviousButton: enablePreviousButton,
    disablePreviousButton: disablePreviousButton,
    enableNextButton: enableNextButton,
    disableNextButton: disableNextButton
  };
});