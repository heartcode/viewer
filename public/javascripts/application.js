/*!
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
  
  /**
   * Private fields
   */
  var moduleString = 'Viewer.App',
      galleryEl,
      galleryItemEls,



  /**
   * Private methods
   */

  resize = function resize(event) {
    resizeGallery();
    resizeGalleryItems();
  },
  resizeGallery = function resizeGallery() {
    $(galleryEl).width(galleryItemEls.length * window.innerWidth);
  },
  resizeGalleryItems = function resizeGalleryItems() {
    for (var i = 0; i < galleryItemEls.length; i++) {
      $(galleryItemEls[i]).width(window.innerWidth);
    }
  },



  /**
   * Public methods
   */

  init = function init() {
    // Storing references to the view components
    galleryEl = document.getElementsByClassName('gallery_images')[0];
    galleryItemEls = document.getElementsByClassName('gallery_image');

    // Adding an event handler to the 'resize' event
    $(window).on('resize', resize);
    $(window).trigger('resize');
  };

   /**
   * Public interface
   */

  return {
    init: init
  };

 });
