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
            Growthbeat.cookieName = 'growthbeatConnectionId';
            Growthbeat.cookieDuration = 14 * 24 * 60 * 60 * 1000;
        }

        public start():void {

            var growthbeatElement:HTMLElement = document.createElement('div');
            growthbeatElement.id = Growthbeat.rootElementId;
            document.body.insertBefore(growthbeatElement, document.body.childNodes[0]);

            if (Growthbeat.CookieUtils.get(Growthbeat.cookieName)) {
                new Growthbeat.HeaderView().show(growthbeatElement);
            } else {
                Growthbeat.Xdm.get('http://localhost:8085/xdm/connections?serviceId=' + Growthbeat.serviceId, (body:string)=> {
                    var connection:Growthbeat.Connection = JSON.parse(body);
                    Growthbeat.CookieUtils.set(Growthbeat.cookieName, connection.id, Growthbeat.cookieDuration);
                    location.reload();
                }, growthbeatElement);
            }

        }

    }

}