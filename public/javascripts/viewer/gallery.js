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

/*global Utils log $ Viewer TweenLite Expo*/

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
      events = Viewer.App.EventAggregator,
      activeItemIndex = 0,
      maxItems,



/*****************************************
 * Private methods
**********************/

  /*
  * Slides the gallery to the active photo
  * @method slideToActivePhoto
  * @private
  */
  slideToActivePhoto = function slideToActivePhoto() {
    
    // TODO make it work dynamically with the window width
    // And obviously the gallery items need to be reset at some point for keeping consistency in the transitions
    
    // Slides the gallery
    TweenLite.to(view, 1.2, {x: - activeItemIndex * window.innerWidth, ease: Expo.easeOut, onComplete: zoomOutActivePhoto});
    
    // Activates the gallery item instance
    galleryItems[activeItemIndex].reset();
  },

  zoomOutActivePhoto = function zoomOutActivePhoto() {
    galleryItems[activeItemIndex].show();
  },


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
    maxItems = data.maxPhotos && data.maxPhotos > 1 && data.maxPhotos <= data.photos.length ? data.maxPhotos : data.photos.length;
    for(var i = 0; i < maxItems; i++) {
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
  },


  /*
  * Shows the previous photo
  * @method showPrevious
  */
  showPrevious = function showPrevious() {
    if (activeItemIndex > 0) {
      activeItemIndex --;
      slideToActivePhoto();

      if (activeItemIndex === 0) {
        events.trigger(Viewer.App.Gallery.Events.FIRST_ITEM_SHOWN);
      } else {
        events.trigger(Viewer.App.Gallery.Events.ITEM_SHOWN);
      }
    }
  },

  /*
  * Shows the next photo
  * @method showNext
  */
  showNext = function showNext() {
    if (activeItemIndex < maxItems - 1) {
      activeItemIndex ++;
      slideToActivePhoto();

      if (activeItemIndex === maxItems - 1){
        events.trigger(Viewer.App.Gallery.Events.LAST_ITEM_SHOWN);
      }
      else {
        events.trigger(Viewer.App.Gallery.Events.ITEM_SHOWN);
      }
    }
  },

  /*
  * Returns the active item's index
  * @method getActiveItemIndex
  * @return {Number}
  */
  getActiveItemIndex = function getActiveItemIndex() {
    return activeItemIndex;
  };

/*****************************************
 * Public static fields
**********************/
  
  // Custom events
  Viewer.App.Gallery.Events = {
    FIRST_ITEM_SHOWN: 'Viewer.App.Gallery.onFirstItemShown',
    LAST_ITEM_SHOWN: 'Viewer.App.Gallery.onLastItemShown',
    ITEM_SHOWN: 'Viewer.App.Gallery.onItemShown'
  };



/*****************************************
 * Public interface
**********************/
  return {
    setup: setup,
    resize: resize,
    next: showNext,
    previous: showPrevious,
    selected: getActiveItemIndex
  };
});