/// <reference path="./hub.d.ts"/>
/// <reference path="./CookieUtils.ts"/>
/// <reference path="./Xdm.ts"/>
/// <reference path="./HeaderView.ts"/>

(function () {

    Hub.headerHeight = 60;

    console.log('Load hub server library');

    var bodyElement:HTMLElement = document.body;

    var hubElement:HTMLElement = document.createElement('div');
    hubElement.id = 'hub';
    bodyElement.insertBefore(hubElement, bodyElement.childNodes[0]);

    var serviceAuthorization:string = Hub.CookieUtils.get('hubServiceAuthorization');
    if (serviceAuthorization) {
        new Hub.HeaderView().show(hubElement);
    } else {
        Hub.Xdm.get('http://localhost:8085/xdm/service_authorizations?connectionId=1&applicationId=3', (body:string)=> {
            Hub.CookieUtils.set('hubServiceAuthorization', body, 14 * 24 * 60 * 60 * 1000);
            location.reload();
        }, hubElement);
    }

}());
