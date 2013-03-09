/*
*
*/
Utils.namespace('Viewer.App.GalleryItem');
Viewer.App.GalleryItem = (function (options) {
  
  /**
   * Private fields
   */
  var container = options.container,
      id = options.id,
      name = 'galleryItem_' + id,
      template = '<li class="gallery_image"><div class="top_pattern"></div><span class="image"></span></li>',
      detailsTemplateSource = $('#template_gallery_details').html(),
      photoItem,
      view,



  /**
   * Private methods
  */



  /**
   * Public methods
  */

  /*
  *
  */
  setup = (function setup(photoURL, details) {
    view = $(template).appendTo(container);
    photoItem = view.find('.image')[0];
    $(photoItem).css('background-image', 'url(' + photoURL + ')');

    var detailsTemplate = Handlebars.compile(detailsTemplateSource),
        detailsTemplateHTML = detailsTemplate(details);
    
    view.append(detailsTemplateHTML);

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