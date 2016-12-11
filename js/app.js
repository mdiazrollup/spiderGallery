(function(){
  var app = angular.module('picGallery', []);
  app.controller('GalleryController',['$http',function($http){
  	var gallery = this;
  	gallery.galleryAPIURL = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK';
  	gallery.tag = 'animals';
  	gallery.images = [];
  	gallery.lightBoxShown = false;
  	gallery.lightBoxSrc = '';
  	gallery.lightBoxAlt = '';

  	/*** slect Tag from Buttons **/
  	gallery.selectTag = function(pTag){
  		gallery.tag = pTag;
  		gallery.getImages();
  	};

  	gallery.isSelectedTag = function(pTag){
  		return gallery.tag === pTag;
  	};

  	/*** Get gallery images from FLICKR API **/
  	gallery.getImages = function(){
  		var url = gallery.galleryAPIURL + '&tags='+gallery.tag;
		$http.jsonp(url).success(function(response) {
			gallery.images = response.items;
		});
  	};

	gallery.toggleLightBox = function(pSrc,pAlt) {
		gallery.lightBoxShown = !gallery.lightBoxShown;
		gallery.lightBoxSrc = pSrc;
		gallery.lightBoxAlt = pAlt;
	};

  	gallery.getImages();  
    
  }]);

	app.directive("imageLightBox",function() {
		return {
			restrict:'E',
			templateUrl:'light-box.html',
			scope: {
				show: '=',
				src:'=',
				alt:'='
			},
			replace: true, // Replace with the template below
			link: function(scope, element, attrs) {
				scope.hideModal = function() {
					scope.show = false;
				};
			} 
		};
	});
})();