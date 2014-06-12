/// <reference path="./hub.d.ts"/>

(function () {

    Hub.headerHeight = 60;

    console.log('Load hub server library');

    var bodyElement:HTMLElement = document.body;

    var hubElement:HTMLElement = document.createElement('div');
    hubElement.id = 'hub';
    bodyElement.insertBefore(hubElement, bodyElement.childNodes[0]);

    var serviceAuthorization:string = getCookie('hubServiceAuthorization');
    if (serviceAuthorization) {
        showHeaderView();
    } else {
        xdm('http://localhost:8085/xdm/service_authorizations?connectionId=1&applicationId=3', (body:string)=> {
            setCookie('hubServiceAuthorization', body, 14 * 24 * 60 * 60 * 1000);
            location.reload();
        });
    }

    function open():void {
        var iframeElement:HTMLIFrameElement = hubElement.getElementsByTagName('iframe')[0];
        iframeElement.style.height = window.innerHeight + 'px';
    }

    function close():void {
        var iframeElement:HTMLIFrameElement = hubElement.getElementsByTagName('iframe')[0];
        iframeElement.style.height = Hub.headerHeight + 'px';
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

    function setCookie(name:string, value:string, expiry:number):void {

        var cookie:string = name + '=' + encodeURIComponent(value);
        cookie += '; expires=' + new Date(new Date().getTime() + expiry).toUTCString();

        document.cookie = cookie;

    }

    function xdm(url:string, callback:(body:string)=>void):void {

        var element:HTMLElement = document.createElement('div');
        element.innerHTML = Hub.templates['XdmView']({
            url: url
        });

        var iframeElement:HTMLIFrameElement = element.getElementsByTagName('iframe')[0];

        window.addEventListener('message', (event:MessageEvent)=> {
            if (event.origin !== "http://localhost:8085")
                return;
            if (event.source != iframeElement.contentWindow)
                return;
            callback(event.data);
            element.parentNode.removeChild(element);
        }, false);

        document.getElementById('hub').appendChild(element);

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
