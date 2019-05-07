Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYjFmZWU0Ny03NDE4LTQyZDYtYTY4YS0zMTM2MjMxMTU1MTgiLCJpZCI6MTA1NzYsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTY4ODMyNzZ9.aAZSMZ3_AQ_aTxUKC87VbAlJw_orNRMoUDZTVk-uRSE';

var viewer = new Cesium.Viewer('cesiumContainer');
const center = Cesium.Cartesian3.fromDegrees(17.605, 46.985, 0.0);
const cameraPos = new Cesium.Cartesian3(0.0, 0.0, 2000);
viewer.camera.lookAt(center, cameraPos);
//viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(17.603, 46.985, 100.0),
    point: {
        color: Cesium.Color.RED,
        pixelSize: 20
    }
})

var scene = viewer.scene;

var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(17.60571, 46.98657, 0.0));
var model = scene.primitives.add(Cesium.Model.fromGltf({
    url: './assets/tali3.glb',
    modelMatrix: modelMatrix,
    scale: 63.3,

}));
console.log(model);

function getMarkerData() {
    const url = "http://192.168.8.149:8080/UAVFusionPOC/rest/fusion/detection/all"; //url of service
    fetch(url)
        .then(res => res.json())
        .then(data => {
            makeMarkerandLineSvg(data);
            console.log(data);
        })
        .catch(err => console.log(err));
}

function makeMarkerandLineSvg(input) {
    let droneSvgContainer = d3
        .select(".cesium-widget")
        .selectAll("svg.droneSvg")
        .data(input, d => {
            return d.id;
        });
    droneSvgContainer.exit().remove();
    let newSvg = droneSvgContainer.enter().append("svg");
    newSvg.attr("class", "droneSvg");
    newSvg.attr("customId", function (d) {
        return d.id;
    });
    newSvg.style("width", 50);
    newSvg.style("height", 50);
    newSvg.style("z-index", 1000);
    droneSvgContainer = newSvg.merge(droneSvgContainer);
    let newCircleGroup = newSvg
        .append("g")
        .attr("class", "circle")
        .attr("width", 50)
        .attr("height", 50);
    newCircleGroup
        .append("circle")
        .attr("cx", 25)
        .attr("cy", 25)
        .attr("r", 6)
        .attr("opacity", 1)
        .attr("stroke", "white")
        .attr("stroke-width", "1")
        .style("z-index", 1000);
}
//getMarkerData()

var circle = new Cesium.CircleGeometry({
    center: Cesium.Cartesian3.fromDegrees(17.60571, 46.98657),
    radius: 100000.0
});
var geometry = Cesium.CircleGeometry.createGeometry(circle);
// scene.primitives.add(geometry)
debugger