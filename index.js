Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYjFmZWU0Ny03NDE4LTQyZDYtYTY4YS0zMTM2MjMxMTU1MTgiLCJpZCI6MTA1NzYsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTY4ODMyNzZ9.aAZSMZ3_AQ_aTxUKC87VbAlJw_orNRMoUDZTVk-uRSE";
var viewer = new Cesium.Viewer("cesiumContainer");
const center = Cesium.Cartesian3.fromDegrees(17.6, 46.985, 40000.0);
const cameraPos = new Cesium.Cartesian3(0.0, 0.0, 2000);
viewer.camera.lookAt(center, cameraPos);
viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

var scene = viewer.scene;

var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
  Cesium.Cartesian3.fromDegrees(17.60571, 46.98657, 0.0)
);
var model = scene.primitives.add(
  Cesium.Model.fromGltf({
    url: "./assets/tali3.glb",
    modelMatrix: modelMatrix,
    scale: 63.3
  })
);

function getMarkerData() {
  const url =
    "http://192.168.8.149:8080/UAVFusionPOC/rest/fusion/detection/all"; //url of service
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeMissingMarker(data);
      for (let i = 0; i < data.length; i++) {
        makeMarker(data[i]);
      }
    })
    .catch(err => console.log(err));
}

function getSensorData() {
  const url = "http://192.168.8.149:8080/UAVFusionPOC/rest/fusion/sensor/all"; //url of service
  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.sensors.forEach(function(e) {
        makeSensor(e);
      });
    })
    .catch(err => console.log(err));
}
viewer.entities.getById();

function makeMarker(data) {
  //console.log(data.id)

  let lat = data.domain.coordinate.latitude;
  let lon = data.domain.coordinate.longitude;
  let height = data.domain.height;
  let id = "uniqueid_" + data.id;
  let oldEntity = viewer.entities.getById(id);
  if (oldEntity === undefined) {
    //console.log(viewer.entities)
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      point: {
        color: Cesium.Color.RED,
        pixelSize: 10
      },
      id: id
    });
  } else {
    //console.log(data.id)
    oldEntity.position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
  }

  // viewer.entities.add({
  //     position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
  //     point: {
  //         color: Cesium.Color.RED,
  //         pixelSize: 10,
  //     },
  //     id: "uniqueid_" + data.id
  //})
  // for (let i = 0; i < viewer.entities._entities._array.length; i++) {
  //     viewer.entities._entities._array[i]._id = data.id
  //     console.log(viewer.entities._entities._array[0]._id);
  // }
}

function removeMissingMarker(data) {
  viewer.entities.values.forEach(function(e) {
    var found = false;
    data.forEach(function(d) {
      if (e.id == "uniqueid" + d.id) {
        found = true;
      }
    });
    if (!found && viewer.entities.values.name !== "sensor") {
      viewer.entities.remove(e);
    }
  });
}

function makeSensor(data) {
  let lat = data.domain.coordinate.latitude;
  let lon = data.domain.coordinate.longitude;
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(lon, lat, 80.0),
    point: {
      color: Cesium.Color.BLUE,
      pixelSize: 20
    },
    name: "sensor"
  });
}

setInterval(() => {
  getMarkerData();
}, 100);
getSensorData();
