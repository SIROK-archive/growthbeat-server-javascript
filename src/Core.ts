/// <reference path="./hub.d.ts"/>
/// <reference path="./CookieUtils.ts"/>
/// <reference path="./Xdm.ts"/>
/// <reference path="./HeaderView.ts"/>

module Hub {

    export class Core {

        private element:HTMLElement;

        constructor() {
            Hub.headerHeight = 60;
            Hub.rootElementId = 'hub';
            Hub.authorizationCookieName = 'hubServiceAuthorization';
            Hub.authorizationCookieExpiry = 14 * 24 * 60 * 60 * 1000;
        }

        public start():void {

            var hubElement:HTMLElement = document.createElement('div');
            hubElement.id = Hub.rootElementId;
            document.body.insertBefore(hubElement, document.body.childNodes[0]);

            if (Hub.CookieUtils.get(Hub.authorizationCookieName)) {
                new Hub.HeaderView().show(hubElement);
            } else {
                // TODO Get connection ID and application ID
                Hub.Xdm.get('http://localhost:8085/xdm/service_authorizations?connectionId=1&applicationId=3', (body:string)=> {
                    Hub.CookieUtils.set(Hub.authorizationCookieName, body, Hub.authorizationCookieExpiry);
                    location.reload();
                }, hubElement);
            }

        }

    }

}