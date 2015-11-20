/* script for the notifications demo page */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function askPermission() {
        Notification.requestPermission(function(result) {
           if ('granted' === result) {
               showNotification('Thanks!', 'You will now see my notifications')
           }
        });
    }

    function showNotification(title, boody) {
        var note = new Notification(title, {body: boody, icon: 'img/notification.png'});

        window.setTimeout(note.close.bind(note), 3000); //3 seconds
    }


    // how to add event listeners on buttons.
    var triggerBtn = document.getElementById('trigger');
    triggerBtn.addEventListener('click', function() {

        switch (Notification.permission) {
            case 'granted':
                showNotification('Hello', 'triggered at ' + new Date().toLocaleTimeString());
                break;

            case 'denied':
                alert('Please enable notifications!');
                break;

            default:
                askPermission();
        }
    });

});
