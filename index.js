Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYjFmZWU0Ny03NDE4LTQyZDYtYTY4YS0zMTM2MjMxMTU1MTgiLCJpZCI6MTA1NzYsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTY4ODMyNzZ9.aAZSMZ3_AQ_aTxUKC87VbAlJw_orNRMoUDZTVk-uRSE';

var viewer = new Cesium.Viewer('cesiumContainer');
const center = Cesium.Cartesian3.fromDegrees(17.605, 46.985, 0.0);
const cameraPos = new Cesium.Cartesian3(0.0, 0.0, 2000);
viewer.camera.lookAt(center, cameraPos);
//viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

var scene = viewer.scene;

var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(17.605, 46.986, 0.0));
var model = scene.primitives.add(Cesium.Model.fromGltf({
    url: './assets/modified_object.glb',
    modelMatrix: modelMatrix,
    scale: 2.8
}));