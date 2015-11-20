
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //Navigator is a global object, the browser creates it and we can use it.
    navigator.getUserMedia = navigator.getUserMedia
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia
                            || navigator.msGetUserMedia;

    // Ask by it's name because it's a css selector
    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var videoStream;
    var mouseIsDown = false;
    var snapshot = document.querySelector('img'); // Grab a reference
    navigator.getUserMedia({video: true}, function(stream) {
        videoStream = stream;
        video.src = window.URL.createObjectURL(stream); // Kind of like image src

    }, function(err) {
        // If the user denies using the webcam
       console.error(err);
    });

    video.addEventListener('click', function() {
       if (videoStream) {
           canvas.width = video.clientWidth;
           canvas.height = video.clientHeight;
           ctx. drawImage(video, 0, 0);
       }
    });

    canvas.addEventListener('mousedown', function(evt) {
        var x = evt.clientX - canvas.offsetLeft;
        var y = evt.clientY - canvas.offsetTop + window.scrollY;
        ctx.strokeStyle = '#FF0000'; //Red
        ctx.beginPath(); //Start Drawing
        ctx.moveTo(x, y); //Move
        mouseIsDown = true;
    });

    canvas.addEventListener('mousemove', function(evt) {
        var x = evt.clientX - canvas.offsetLeft;
        var y = evt.clientY - canvas.offsetTop  + window.scrollY;

        if (mouseIsDown) {
            ctx.lineTo(x, y); //Create line but not draw
            ctx.stroke(); //Draw
        }
    });

    canvas.addEventListener('mouseup', function(evt) {
        mouseIsDown = false;
    });

    document.querySelector('#btnSnapshot').addEventListener('click', function() {
        snapshot.src = canvas.toDataURL();
    })
});

