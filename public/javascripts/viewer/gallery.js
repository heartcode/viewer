/*
  * Viewer.App.Gallery
  *
  * The Gallery module of the viewer
  * This module is responsible for controlling the gallery items (photos with their details)
  *
  *
  * 2013 Robert Pataki [robert@robertpataki.com]
  *
*/

/*global Utils log $ Viewer*/

Utils.namespace('Viewer.App.Gallery');
Viewer.App.Gallery = (function (options) {
  'use strict';


  
/*****************************************
 * Private fields
**********************/

  var container = options.container,
      name = 'galleryItem',
      template = '<ul class="gallery_images"></ul>',
      view,
      galleryItems = [],



/*****************************************
 * Private methods
**********************/



/*****************************************
 * Public methods
**********************/

  /*
  * Sets up the gallery instance
  * @method setup
  * @param data {Object} The externally loaded setup data containing photo details and file paths
  */
  setup = function setup(data) {
    view = $(template).appendTo(container);

    // Creates each gallery item using the details found in the loaded data file
    for(var i = 0; i < data.photos.length; i++) {
      var photoData = data.photos[i],
          photoURL = data.imageBaseURL + data.photoFolder + photoData.photo,
          photoDetails = {
            title: photoData.title,
            author: photoData.author,
            location: photoData.location
          },
          galleryItem = new Viewer.App.GalleryItem({container: view, id: i, photoURL: photoURL, details: photoDetails});
      galleryItems.push(galleryItem);
    }

    return this;
  },

  /*
  * Handles the browser resize
  * @method resize
  */
  resize = function resize(){
    // Resizes the gallery view
    $(view).width(galleryItems.length * window.innerWidth);

    // Resizes each gallery item
    for (var i = 0; i < galleryItems.length; i++) {
      galleryItems[i].resize();
    }
  };



/*****************************************
 * Public interface
**********************/
  return {
    setup: setup,
    resize: resize
  };
});