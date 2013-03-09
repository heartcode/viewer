/*
* 
*/
Utils.namespace('Viewer.App.Gallery');
Viewer.App.Gallery = (function (options) {
  
  /**
   * Private fields
   */
  var container = options.container,
      name = 'galleryItem',
      template = '<ul class="gallery_images"></ul>',
      view,
      galleryItems = [],



  /**
   * Private methods
  */



  /**
   * Public methods
  */
  setup = function setup(data) {
    // TODO - do this using proper templating such as underscore, handlebars or mustache
    view = $(template).appendTo(container);

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
  * @private
  */
  resize = function resize(){
    $(view).width(galleryItems.length * window.innerWidth);

    for (var i = 0; i < galleryItems.length; i++) {
      galleryItems[i].resize();
    }
  };



  /**
   * Public interface
  */
  return {
    setup: setup,
    resize: resize
  };
});