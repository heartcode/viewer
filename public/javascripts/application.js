/*
  * Viewer.App
  *
  * Main Facade for bootstrapping all application components.
  *
  *
  * 2013 Robert Pataki [robert@robertpataki.com]
  *
*/

/*global Utils log $*/

var Viewer = Viewer || {};

Utils.namespace('Viewer.App');
Viewer.App = (function () {
  'use strict';
  


/*****************************************
 * Private fields
**********************/

  var moduleString = 'Viewer.App',
      events,
      galleryInstance,
      navigationInstance,
      cacheBuster = '?' + new Date().getTime(),


  
/*****************************************
 * Private methods
**********************/

  /*
  * Handles the browser resize
  * @method resize
  * @private
  * param event {Object} The resize event
  */
  resize = function resize(event) {
    galleryInstance.resize();
    navigationInstance.resize();
  },

  /*
  * Creates the Gallery module instance and passes the loaded data to it
  * @method createGallery
  * @private
  * params data {Object} The externally loaded JSON data
  */
  createGallery = function createGallery(data) {
    galleryInstance = new Viewer.App.Gallery({
      container: document.getElementsByClassName('gallery_container')[0]
    }).setup(data);
  },

  /*
  * Creates the Navigation module instance, that will control the photo navigation
  * @method createNavigation
  * @private
  */
  createNavigation = function createNavigation() {
    navigationInstance = new Viewer.App.Navigation({
      container: document.getElementsByClassName('gallery_container')[0]
    });
    events.on(Viewer.App.Navigation.Events.BUTTON_CLICK, onNavigationButtonClick);
  },

  /*
  * Loads the external settings JSON file and calls the gallery creator method on success
  * @method loadSettings
  * @private
  */
  loadSettings = function loadSettings() {
    $.when(
      $.ajax('resources/settings.json' + cacheBuster)
    ).done(function (data) {
      createGallery(data);
      createNavigation();
      resize();
    }).fail(function () {
      // TODO - Handling the error visually in the application
      log('Setup error!');
    });
  },

  /*
  * Handles the navigation button click events
  * @method onNavigationButtonClick
  * @private
  * @param event {Object} The triggering event
  */
  onNavigationButtonClick = function onNavigationButtonClick(event, button) {
    if (button === Viewer.App.Navigation.Buttons.NEXT) {
      galleryInstance.next();
    } else if (button === Viewer.App.Navigation.Buttons.PREV) {
      galleryInstance.previous();
    }
  },



/*****************************************
 * Public methods
**********************/

  /*
  * Sets up the application instance
  * @method setup
  */
  setup = function setup() {

    // Setting up the events for custom event handling
    events = Viewer.App.EventAggregator,

    // Adds an event handler to the 'resize' event
    $(window).on('resize', resize);

    // Loads the settings
    loadSettings();
  };


  // Experimental applications level Event Aggregator using jQuery event API by wrapping a simple JS object.
  // The really nice experimental work done by Daniel Demmel [dain@danieldemmel.me]
  // Inspired by: http://lostechies.com/derickbailey/2012/04/03/revisiting-the-backbone-event-aggregator-lessons-learned/
  // For one caveat (don't put a 'length' property on the object) see: http://www.bennadel.com/blog/1905-jQuery-Event-Bindings-On-Javascript-Objects-With-A-Length-Property.htm
  Utils.namespace('Viewer.App.EventAggregator');
  Viewer.App.EventAggregator = $({id: 'EventAggregator'});



/*****************************************
 * Public interface
**********************/

  return {
    setup: setup
  };

 });
