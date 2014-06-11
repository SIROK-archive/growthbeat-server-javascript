/// <reference path="./hub.d.ts"/>

(function () {

    console.log('Load hub server library');

    var bodyElement:HTMLElement = document.body;
    var headerHeight:number = 60;

    var hubElement:HTMLElement = document.createElement('div');
    hubElement.id = 'hub';
    hubElement.innerHTML = Hub.templates['HeaderView']({
        height: headerHeight
    });

    bodyElement.insertBefore(hubElement, bodyElement.childNodes[0]);

    window.addEventListener('message', (event:MessageEvent)=> {
        if (event.origin !== "http://localhost:8085")
            return;
        console.log('Receive message: ' + event.data);
        open();
    }, false);

    xdm('http://localhost:8085/xdm/service_authorizations?connectionId=1&applicationId=3&callback=callback_xxx', (body:any)=> {
        console.log(body);
    });

    function open() {
        var iframeElement:HTMLIFrameElement = hubElement.getElementsByTagName('iframe')[0];
        iframeElement.style.height = window.innerHeight + 'px';
    }

    function close() {
        var iframeElement:HTMLIFrameElement = hubElement.getElementsByTagName('iframe')[0];
        iframeElement.style.height = headerHeight + 'px';
    }

    function getCookie(name:string):string {

        if (!document.cookie)
            return null;

        var cookies:Array<string> = document.cookie.split("; ");
        for (var i in cookies) {
            var nameValuePair:Array<string> = cookies[i].split("=");
            if (nameValuePair[0] != name)
                continue;
            return decodeURIComponent(nameValuePair[1]);
        }

        return null;

    }

    function xdm(url:string, callback:(body:any)=>void) {

        var hubElement:HTMLElement = document.createElement('div');
        hubElement.id = 'hub';
        hubElement.innerHTML = Hub.templates['XdmView']({
            url: url
        });

        bodyElement.insertBefore(hubElement, bodyElement.childNodes[0]);

    }


}());
