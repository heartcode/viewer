Utils.namespace('Viewer.App.GalleryItem');

/*
*
*/
Viewer.App.GalleryItem = (function (options) {
  /**
   * Private fields
   */
  var container = options.container,
      id = options.id,
      name = 'galleryItem_' + id,
      template = '<li class="gallery_image"><span class="image"></span></li>',
      photoItem,
      view,



  /**
   * Private methods
  */



  /**
   * Public methods
  */
  setup = (function setup(photoURL, details) {
    view = $(template).appendTo(container);
    photoItem = view.find('.image')[0];
    $(photoItem).css('background-image', 'url(' + photoURL + ')');
  })(options.photoURL, options.details),

  /*
  * Handles the browser resize
  * @method resize
  * @private
  */
  resize = function resize(){
    $(view).width(window.innerWidth);
  };



  /**
   * Public interface
  */
  return {
    resize: resize
  };
});