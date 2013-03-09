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

  onButtonClick = function onButtonClick(event) {
    var buttonId = 'next';
    if (event.currentTarget === nextButton[0]) {
      
    } else if (event.currentTarget === prevButton[0]) {
      buttonId = 'previous';
    }
    events.trigger(Viewer.App.Navigation.Events.onButtonClick, buttonId);
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
    onButtonClick: 'Viewer.App.Navigation.onButtonClick'
  };


/*****************************************
 * Public interface
**********************/

  return {
    resize: resize
  };
});