/// <reference path="./hub.d.ts"/>
/// <reference path="./CookieUtils.ts"/>
/// <reference path="./Xdm.ts"/>

(function () {

    Hub.headerHeight = 60;

    console.log('Load hub server library');

    var bodyElement:HTMLElement = document.body;

    var hubElement:HTMLElement = document.createElement('div');
    hubElement.id = 'hub';
    bodyElement.insertBefore(hubElement, bodyElement.childNodes[0]);

    var serviceAuthorization:string = Hub.CookieUtils.get('hubServiceAuthorization');
    if (serviceAuthorization) {
        showHeaderView();
    } else {
        Hub.Xdm.get('http://localhost:8085/xdm/service_authorizations?connectionId=1&applicationId=3', (body:string)=> {
            Hub.CookieUtils.set('hubServiceAuthorization', body, 14 * 24 * 60 * 60 * 1000);
            location.reload();
        }, hubElement);
    }

    function open():void {
        var iframeElement:HTMLIFrameElement = hubElement.getElementsByTagName('iframe')[0];
        iframeElement.style.height = window.innerHeight + 'px';
    }

    function close():void {
        var iframeElement:HTMLIFrameElement = hubElement.getElementsByTagName('iframe')[0];
        iframeElement.style.height = Hub.headerHeight + 'px';
    }

    function showHeaderView():void {

        var element:HTMLElement = document.createElement('div');
        element.innerHTML = Hub.templates['HeaderView']({
            height: Hub.headerHeight
        });

        var iframeElement:HTMLIFrameElement = element.getElementsByTagName('iframe')[0];

        window.addEventListener('message', (event:MessageEvent)=> {
            if (event.origin !== "http://localhost:8085")
                return;
            if (event.source != iframeElement.contentWindow)
                return;
            // TODO Controll open/close
            console.log('Receive message: ' + event.data);
            open();
        }, false);

        document.getElementById('hub').appendChild(element);

    }

}());
