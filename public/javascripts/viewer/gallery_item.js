/*
  * Viewer.App.Gallery
  *
  * The GalleryItem module of the viewer.
  * This module holds each photo and their details
  *
  *
  * 2013 Robert Pataki [robert@robertpataki.com]
  *
*/

/*global Utils log $ Viewer Handlebars TweenLite Expo*/

Utils.namespace('Viewer.App.GalleryItem');
Viewer.App.GalleryItem = (function (options) {
  'use strict';


  
/*****************************************
 * Private fields
**********************/

  var container = options.container,
      id = options.id,
      name = 'galleryItem_' + id,
      template = '<li class="gallery_image"><div class="top_pattern"></div><span class="image"></span></li>',
      detailsTemplateSource = $('#template_gallery_details').html(),
      photoItem,
      $detailsTitle,
      $detailsCopy,
      view,
      detailsTitleAnimOffsetX = 40,
      detailsCopyAnimOffsetX = 60,



/*****************************************
 * Private methods
**********************/

  /*
  * Sets up the Gallery item instance
  * @method setup
  * @param photoURL {String} The path to the photo file
  * @param details {Object} The object holding data such as {{title}}, {{author}} and {{location}} of each photo
  * @private
  */
  setup = (function setup(photoURL, details) {
    view = $(template).appendTo(container);
    photoItem = view.find('.image')[0];
    $(photoItem).css('background-image', 'url(' + photoURL + ')');

    var detailsTemplate = Handlebars.compile(detailsTemplateSource),
        detailsTemplateHTML = detailsTemplate(details);
    
    view.append(detailsTemplateHTML);

    $detailsTitle = view.find('.detail_block h2').parent();
    $detailsCopy = view.find('.detail_block p').parent();

  })(options.photoURL, options.details),



/*****************************************
 * Public methods
**********************/

  /*
  * Handles the browser resize
  * @method resize
  * @private
  */
  resize = function resize(){
    $(view).width(window.innerWidth);
  },

  /*
  * Resets the photo transitions
  * @method resetAnimations
  */
  resetAnimations = function resetAnimations() {
    TweenLite.killTweensOf($(photoItem));
    TweenLite.set($(photoItem), {scale: 1});
  },

  /*
  * Prepares the photo instance for the 'show' transition
  * @method prepareAnimations
  * @param direction {String} The direction of the navigation change, that we need to nicely set the details transitions to match the direction of the gaallery animation flow
  */
  prepareAnimations = function prepareAnimations(direction) {
    // Preparing the animations of the details
    var titleResetPosX = !direction || direction === Viewer.App.Gallery.Directions.LEFT ? -detailsTitleAnimOffsetX : detailsTitleAnimOffsetX,
        copyResetPosX = !direction || direction === Viewer.App.Gallery.Directions.LEFT ? -detailsCopyAnimOffsetX : detailsCopyAnimOffsetX;

    TweenLite.killTweensOf($detailsTitle);
    TweenLite.killTweensOf($detailsCopy);
    TweenLite.set($detailsTitle, {opacity: 0, x: titleResetPosX});
    TweenLite.set($detailsCopy, {opacity: 0, x: copyResetPosX});

    // Preparing the animations of the photo
    TweenLite.killTweensOf($(photoItem));
    TweenLite.set($(photoItem), {scale: Viewer.App.GalleryItem.LARGE_PHOTO_SCALE});

    return this;
  },

  /*
  * Applies a smooth scaling animation on the photo instance
  * @method show
  */
  show = function show() {
    // Animating the photo
    TweenLite.killTweensOf($(photoItem));
    TweenLite.to($(photoItem), 12, {scale: 1, ease: Expo.easeOut, transformOrigin: 'center center'});

    // Animating the details
    TweenLite.to($detailsTitle, 0.9, {opacity: 1, x: 0, delay: 0.2, ease: Expo.easeOut});
    TweenLite.to($detailsCopy, 0.9, {opacity: 1, x: 0, delay: 0.3, ease: Expo.easeOut});
  };



/*****************************************
 * Public static fields
**********************/

  Viewer.App.GalleryItem.LARGE_PHOTO_SCALE = 1.4;



/*****************************************
 * Public interface
**********************/

  return {
    resize: resize,
    reset: resetAnimations,
    prepare: prepareAnimations,
    show: show
  };
});