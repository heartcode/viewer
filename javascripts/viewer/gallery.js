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
      prevActiveIndex = null,
      activeItemIndex = 0,
      maxItems,
      slideTransition = null,
      direction = null,



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
    var destPosX = - activeItemIndex * window.innerWidth;

    // Slides the gallery
    TweenLite.killTweensOf(view);
    slideTransition = TweenLite.to(view, 0.6, {x: destPosX, ease: Expo.easeOut});

    // Activates the gallery item instance
    galleryItems[activeItemIndex].prepare(direction).show();
  },

  /*
  * Resets the current photo before starting to animate the 'new' active one
  * @method resetCurrentPhoto
  * @private
  */
  resetCurrentPhoto = function resetCurrentPhoto() {
    galleryItems[prevActiveIndex].reset();
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
            index: i + 1,
            total: maxItems,
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

    // Correcting the positioning differences caused by the resize
    slideToActivePhoto();
  },


  /*
  * Shows the previous photo
  * @method showPrevious
  */
  showPrevious = function showPrevious() {
    if (activeItemIndex > 0) {
      direction = Viewer.App.Gallery.Directions.LEFT;
      prevActiveIndex = activeItemIndex;
      activeItemIndex --;
      resetCurrentPhoto();
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
      direction = Viewer.App.Gallery.Directions.RIGHT;
      prevActiveIndex = activeItemIndex;
      activeItemIndex ++;
      resetCurrentPhoto();
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
  },

  // Navigation directions
  Viewer.App.Gallery.Directions = {
    LEFT: 'Viewer.App.Gallery.left',
    RIGHT: 'Viewer.App.Gallery.right'
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