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
      galleryInstance,
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
    resize();
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
    }).fail(function () {
      // TODO - Handling the error visually in the application
      log('Setup error!');
    });
  },



/*****************************************
 * Public methods
**********************/

  /*
  * Sets up the application instance
  * @method setup
  */
  setup = function setup() {
    // Adds an event handler to the 'resize' event
    $(window).on('resize', resize);

    // Loads the settings
    loadSettings();
  };



/*****************************************
 * Public interface
**********************/

  return {
    setup: setup
  };

 });
