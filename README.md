# angular-image-loader

> Image Loader Plugin for AngularJS

## Install
1. `bower install -S angular-image-loader`
2. Insert `<script src="/path/to/your/angular-image-loader.js"></script>` after angular.js

## Usage
1. Add `tomNgImgLoader` as your module dependency
2. Inject `tomNgImgLoader` as a service and use it like this:
```javascript
  tomNgImgLoader([
    '/images/img1.jpg',
    '/images/img2.jpg',
    '/images/img3.jpg'
  ], function () {
    // do something
  }, callbackContext);
```
