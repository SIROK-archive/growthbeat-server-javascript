/// <reference path="./hub.d.ts"/>

(function () {

    console.log('Load hub server library');

    var bodyElement:HTMLElement = document.body;

    var hubElement:HTMLElement = document.createElement('div');
    hubElement.id = 'hub';
    hubElement.innerHTML = Hub.templates['HeaderView']({});

    bodyElement.insertBefore(hubElement, bodyElement.childNodes[0]);

    window.addEventListener('message', function (event:MessageEvent) {
        if (event.origin !== "http://localhost:8085")
            return;
        console.log('Receive message: ' + event.data)
    }, false);

}());
