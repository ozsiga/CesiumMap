Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYjFmZWU0Ny03NDE4LTQyZDYtYTY4YS0zMTM2MjMxMTU1MTgiLCJpZCI6MTA1NzYsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTY4ODMyNzZ9.aAZSMZ3_AQ_aTxUKC87VbAlJw_orNRMoUDZTVk-uRSE';
// var west = 17.605;
// var south = 46.885;
// var east = 17.805;
// var north = 46.985;

// var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

// Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
// Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;
// Create a camera looking down the negative z-axis, positioned at the origin,
// with a field of view of 60 degrees, and 1:1 aspect ratio.


// const viewer = new Cesium.Viewer('cesiumContainer');


// let center = Cesium.Cartesian3.fromDegrees(17.605, 46.985);
// viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0, 2000));
var viewer = new Cesium.Viewer('cesiumContainer');
var center = Cesium.Cartesian3.fromDegrees(17.605, 46.985);
var cameraPos = new Cesium.Cartesian3(0.0, 0.0, 2000);
viewer.camera.lookAt(center, cameraPos);
viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);