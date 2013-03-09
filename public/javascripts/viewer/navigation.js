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
      template = '<div class="viewer_navigation"><div class="button previous"><i class="icon-angle-left"></i></div><div class="button next"><i class="icon-angle-right"></i></div></div>',
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
  * @param event {}
  * @private
  */
  onButtonClick = function onButtonClick(event) {
    var button = Viewer.App.Navigation.Buttons.NEXT;
    if (event.currentTarget === prevButton[0]) {
      button = Viewer.App.Navigation.Buttons.PREV;
    }
    events.trigger(Viewer.App.Navigation.Events.BUTTON_CLICK, button);
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
  })(),


/*****************************************
 * Public methods
**********************/

  /*
  * Handles the browser resize
  * @method resize
  */
  resize = function resize() {
    
  };


/*****************************************
 * Public static fields
**********************/
  
  // Custom events
  Viewer.App.Navigation.Events = {
    BUTTON_CLICK: 'Viewer.App.Navigation.onButtonClick'
  };
  // Button names
  Viewer.App.Navigation.Buttons = {
    NEXT: 'nextButton',
    PREVIOUS: 'prevButton'
  };


/*****************************************
 * Public interface
**********************/

  return {
    resize: resize
  };
});