"use strict";

angular.module('tomNgImgLoader', [])
.factory('tomNgImgLoader', function ($timeout) {
  var self = this;
  var loadedImages = [],
      loadingImages = [];

  function isLoaded (imagesToLoad) {
    for (var i = 0; i < imagesToLoad.length; i++) {
      if (loadedImages.indexOf(imagesToLoad[i]) < 0) {
        return false;
      }
    }
    return true;
  }

  function imgLoader(imgList, callback, context) {
    var context = context || self;

    for (var i = 0; i < imgList.length; i++) {
      (function (ii) {
        if (loadedImages.indexOf(imgList[ii]) < 0) {
          if (loadingImages.indexOf(imgList[ii]) < 0) {
            var img;

            try {
              img = new Image();
            } catch (e) {
              img = document.createElement('img');
              throw 'Warning: You are using an out-dated browser.';
            }

            img['oncomplete' in img ? 'oncomplete' : 'onload'] = function () {
              loadedImages.push(imgList[ii]);
              if (isLoaded(imgList)) {
                callback.call(context);
              }
            };

            img.src = imgList[ii];
            loadingImages.push(imgList[ii]);
          }
        }
      })(i);
    }

    if (isLoaded(imgList)) {
      callback.call(context);
    }
  }

  return imgLoader;
});
