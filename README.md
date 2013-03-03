#viewer
===

Image viewer using JavaScript and the Flickr API

<br>

##Requirements
- Full browser screen image viewer, that uses the Flickr API to load in images, that are tagged by certain (defined by the developer) tags or keywords
- Next and previous navigation
- The viewer also should work comfortably on tablets
<br><br>
- Thumbnail view at the bottom of the screen:
  - A sort of footer strip that opened and closed
  - Should have next and previous navigation buttons
  - Contains the thumbnail version of the normal sized images
- The app must work offline:
  - If the app cannot connect to the Flickr API, it must use some self hosted images and work exactly the same as it was online (obviously the amount of offline self hosted images is a limitation)
- The normal size view shoulds display the image details:
  - Title of the photo
  - Author of the photo

<br>
  
##Developer notes

To be able to work more comfortably with the project (using styling mixins for instance), I set up a static Rack server instance, and added some gems to help along the way.

###Run the rack server using Pow
The fastest way to run the app is to use [Pow](http://pow.cx/) and [Powify](https://github.com/sethvargo/powify).

###Compile stylesheets using Compass

Compass is hooked onto Guard, so whenever a stylesheet file changes, Compass will compile the stylesheets (Guard will also reload the browser):
	
	$ bundle exec guard

If you don't want to run guard, simply run compass in watch mode, so that it will compile the stylesheets by itself (no browser refresh):

	$ compass watch -c config/compass.rb 


###Compile assets for production using Jammit

Jammit is also hooked onto Guard, so it will precomile the assets for production. The end result is gzipped, minified and unglified assets for production environment.

	$ bundle exec guard

Jammit also can run without guard, using the config/assets.yml file.

	$ jammit -c config/assets.yml
	
###Auto compile assets using Guard
Guard is set up to monitor the file changes in the assets folder and as soon as you save any SASS or JS files, it will tell Jammit and Compass to recompile the asset files straight away.

	$ bundle exec guard
	