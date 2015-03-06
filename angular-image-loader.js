"use strict";

angular.module('tomNgImgLoader', [])
.factory('tomNgImgLoader', function () {
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

    if (isLoaded(imgList)) {
      callback.call(context);
    } else {
      for (var i = 0; i < imgList.length; i++) {
        (function (ii) {
          if (loadedImages.indexOf(imgList[ii]) < 0) {
            if (loadingImages.indexOf(imgList[ii]) < 0) {
              var img;
              loadingImages.push(imgList[ii]);

              try {
                img = new Image();
              } catch (e) {
                img = document.createElement('img');
                throw 'Warning: You are using an out-dated browser.';
              }

              if ('onreadystatechange' in img) {
                img.onreadystatechange = function () {
                  if (img.readyState === "complete" || img.readyState === "loaded") {
                    loadedImages.push(imgList[ii]);
                    if (isLoaded(imgList)) {
                      callback.call(context);
                    }
                  }
                };
                img.src = imgList[ii];
              } else {
                // onload is useless when image is in browser cache, so..
                img.src = imgList[ii];
                (function checkWidth (_img, _loadedImages, _url, _isLoaded, _imgList, _callback, _context) {
                  if (_img.width > 0 || _img.natrualWidth > 0) {
                    _loadedImages.push(_url);
                    if (_isLoaded(_imgList)) {
                      _callback.call(_context);
                    }
                  } else {
                    setTimeout(function () {
                      checkWidth(_img, _loadedImages, _url, _isLoaded, _imgList, _callback, _context);
                    }, 200);
                  }
                })(img, loadedImages, imgList[ii], isLoaded, imgList, callback, context);
              }
            }
          }
        })(i);
      }
    }
  }

  return imgLoader;
});
