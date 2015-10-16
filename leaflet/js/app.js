/*
    script file for index.html
    dependencies: leaflet, jquery

    Open Street Maps tile layer URL template:
    http://{s}.tile.osm.org/{z}/{x}/{y}.png

    attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
*/

$(function() {
    'use strict'

    function createMap(loc, zoom) {
        // Copy and Pasted from the Leaflet.js website.
        var map = L.map('map').setView(loc, zoom);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            // Required by law. Give them credit where it's due.
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Creating Markers, look at their API to find what kinds of methods you can use. ex. circleMarker, marker.
        // Markers are SVGs.
        L.circleMarker(loc).addTo(map).bindPopup('<h2>Hello</h2>');

        // bindPopup accepts any html. ex. h2, img, p, etc.
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
           createMap([pos.coords.latitude, pos.coords.longitude], 15);
        });
    }
    else {
        createMap([47.6097, -122.3331], 12);
    }
    // Iterate over the JSON with .forEach
    // Each element is an object that have properties that will be important.
});
