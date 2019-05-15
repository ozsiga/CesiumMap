Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYjFmZWU0Ny03NDE4LTQyZDYtYTY4YS0zMTM2MjMxMTU1MTgiLCJpZCI6MTA1NzYsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTY4ODMyNzZ9.aAZSMZ3_AQ_aTxUKC87VbAlJw_orNRMoUDZTVk-uRSE";

let viewer = new Cesium.Viewer("cesiumContainer");
const center = new Cesium.Cartesian3.fromDegrees(17.605, 46.985, 4000.0);
const cameraPos = new Cesium.Cartesian3(0.0, 0.0, 2000);
viewer.camera.lookAt(center, cameraPos);
viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

let homeCameraView = {
    destination: center
};

// Override the default home button
viewer.homeButton.viewModel.command.beforeExecute.addEventListener((e) => {
    e.cancel = true;
    viewer.scene.camera.flyTo(homeCameraView);
});

let scene = viewer.scene;

// Add sunlight to globe
scene.globe.enableLighting = true;

// let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
//     Cesium.Cartesian3.fromDegrees(17.60571, 46.98657, 0.0));
// let model = scene.primitives.add(Cesium.Model.fromGltf({
//     url: './assets/tali3.glb',
//     modelMatrix: modelMatrix,
//     scale: 63.3,
// }));

function getMarkerData() {
    const url = "http://192.168.8.149:8080/UAVFusionPOC/rest/fusion/detection/all"; //url of service
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeMarker(data);
            data.forEach(drone => makeMarker(drone));
        })
        .catch(err => console.log(err));
}

function getSensorData() {
    const url = "http://192.168.8.149:8080/UAVFusionPOC/rest/fusion/sensor/all"; //url of service
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.sensors.forEach(sensor => makeSensor(sensor));
        })
        .catch(err => console.log(err));
}

function makeMarker(data) {
    let lat = data.domain.coordinate.latitude;
    let lon = data.domain.coordinate.longitude;
    let height = Math.round(data.domain.height);
    let id = "uniqueid_" + data.id;
    let oldEntity = viewer.entities.getById(id);
    if (oldEntity === undefined) {
        viewer.entities.add({
            id: id,
            position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            point: {
                color: Cesium.Color.RED,
                pixelSize: 10,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 1
            },
            label: {
                text: height + ' m',
                font: '16px sans-serif',
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                outlineWidth: 3,
                verticalOrigin: Cesium.VerticalOrigin.TOP,
                pixelOffset: new Cesium.Cartesian2(0, 10)
            }
        });
    } else {
        oldEntity.position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
    }
}

function makeSensor(data) {
    let lat = data.domain.coordinate.latitude;
    let lon = data.domain.coordinate.longitude;

    viewer.entities.add({
        name: "sensor",
        position: Cesium.Cartesian3.fromDegrees(lon, lat, 80.0),
        point: {
            color: Cesium.Color.BLUE,
            pixelSize: 20
        }
    });
}

function removeMarker(data) {
    viewer.entities.values.forEach((entity) => {
        let found = false;

        data.forEach(drone => {
            if (entity.id == "uniqueid" + drone.id) {
                found = true;
            }
        });

        if (!found && entity.name !== "sensor") {
            viewer.entities.remove(entity);
        }
    });
}

setInterval(() => {
    getMarkerData();
}, 100);
getSensorData();