/// <reference path="./growthbeat.d.ts"/>
/// <reference path="./CookieUtils.ts"/>
/// <reference path="./Xdm.ts"/>
/// <reference path="./HeaderView.ts"/>

module Growthbeat {

    export class Core {

        private element:HTMLElement;

        constructor() {
            Growthbeat.headerHeight = 60;
            Growthbeat.rootElementId = 'growthbeat';
            Growthbeat.authorizationCookieName = 'growthbeatServiceAuthorization';
            Growthbeat.authorizationCookieExpiry = 14 * 24 * 60 * 60 * 1000;
        }

        public start():void {

            var growthbeatElement:HTMLElement = document.createElement('div');
            growthbeatElement.id = Growthbeat.rootElementId;
            document.body.insertBefore(growthbeatElement, document.body.childNodes[0]);

            if (Growthbeat.CookieUtils.get(Growthbeat.authorizationCookieName)) {
                new Growthbeat.HeaderView().show(growthbeatElement);
            } else {
                Growthbeat.Xdm.get('http://localhost:8085/xdm/connections?applicationId=' + Growthbeat.applicationId + '&serviceId=' + Growthbeat.serviceId, (body:string)=> {
                    Growthbeat.CookieUtils.set(Growthbeat.authorizationCookieName, body, Growthbeat.authorizationCookieExpiry);
                    location.reload();
                }, growthbeatElement);
            }

        }

    }

}