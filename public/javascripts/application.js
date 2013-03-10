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
    events.on(Viewer.App.Gallery.Events.ITEM_SHOWN, onPhotoShown);
    events.on(Viewer.App.Gallery.Events.FIRST_ITEM_SHOWN, onFirstPhotoShown);
    events.on(Viewer.App.Gallery.Events.LAST_ITEM_SHOWN, onLastPhotoShown);
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
    events.on(Viewer.App.Navigation.Events.NEXT_BUTTON_CLICK, onNextNavButtonClick);
    events.on(Viewer.App.Navigation.Events.PREV_BUTTON_CLICK, onPreviousNavButtonClick);
    navigationInstance.disablePreviousButton();
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



/*****************************************
 * Event handlers
**********************/

  /*
  * Handles the navigation 'NEXT' button click events
  * @method onNextNavButtonClick
  * @private
  * @param event {Object} The triggering event
  */
  onNextNavButtonClick = function onNextNavButtonClick(event) {
    galleryInstance.next();
  },

  /*
  * Handles the navigation 'PREVIOUS' button click events
  * @method onPreviousNavButtonClick
  * @private
  * @param event {Object} The triggering event
  */
  onPreviousNavButtonClick = function onPreviousNavButtonClick(event) {
    galleryInstance.previous();
  },

  /*
  * Handles the the single photo shown event triggered by the Gallery instance
  * @method onPhotoShown
  * @private
  * @param event {Object} The triggering event
  */
  onPhotoShown = function onPhotoShown(event) {
    navigationInstance.enableNextButton();
    navigationInstance.enablePreviousButton();
  },

  /*
  * Handles the the FIRST photo shown event triggered by the Gallery instance
  * @method onPhotoShown
  * @private
  * @param event {Object} The triggering event
  */
  onFirstPhotoShown = function onFirstPhotoShown(event) {
    navigationInstance.disablePreviousButton();
  },

  /*
  * Handles the the LAST photo shown event triggered by the Gallery instance
  * @method onPhotoShown
  * @private
  * @param event {Object} The triggering event
  */
  onLastPhotoShown = function onLastPhotoShown(event) {
    navigationInstance.disableNextButton();
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
