/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/
/* where we write all of our jQuery */

// when the DOM content has been loaded; synonymous to what we've been doing in JavaScript, but way easier.
$(function() {
    'use strict'
    $('a').attr('target', '_blank');
    $('article').hide().fadeIn(1000);
    $('#toggle-article').click(function() {
       $('article').fadeToggle();
    });

    // For the Next Challenge, to get traffic cam data.

    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f';
    $.getJSON(url).then(function(data) {
        console.log(data);
        // Select the data from the console.
        var temperature = data.main.temp;
        // Select Span element with the #temp id.
        $('#temp').text(Math.round(temperature));
    });

    console.log('test');

});
