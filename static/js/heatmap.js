"use strict";
let map, heatmap;

function initMap() {
    var points = getPoints();

    console.log(points[0].location.lat())
    console.log(points[0].location.lng())

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {
            lat: points[0].location.lat(), 
            lng: points[0].location.lng()
        },
        mapTypeId: "satellite"
    });
    
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: points,
        map: map
    });
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)"
    ];
    heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

function changeRadius() {
    heatmap.set("radius", heatmap.get("radius") ? null : 20);
}

function changeOpacity() {
    heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
} // Heatmap data: 500 Points

function getPoints() {
    // TODO: Call server here
    return points;
}

var x = document.getElementById("map");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

function loadLaunch() {
    console.log('loading launch')
    console.log(document.getElementById("launch").innerHTML)
}

initMap()