/// <reference path="./growthbeat.d.ts"/>
/// <reference path="./CookieUtils.ts"/>
/// <reference path="./Xdm.ts"/>
/// <reference path="./HeaderView.ts"/>

module Growthbeat {

    export class Core {

        private element:HTMLElement;

        constructor() {
            Growthbeat.baseUrl = (Growthbeat.baseUrl || 'https://growthbeat.com/');
            Growthbeat.headerHeight = (Growthbeat.headerHeight || 60);
            Growthbeat.rootElementId = (Growthbeat.rootElementId || 'growthbeat');
            Growthbeat.cookieName = (Growthbeat.cookieName || 'growthbeat[sessionId]');
            Growthbeat.cookieDuration = (Growthbeat.cookieDuration || 14 * 24 * 60 * 60 * 1000);
        }

        public start():void {

            var growthbeatElement:HTMLElement = document.createElement('div');
            growthbeatElement.id = Growthbeat.rootElementId;
            document.body.insertBefore(growthbeatElement, document.body.childNodes[0]);

            if (Growthbeat.CookieUtils.get(Growthbeat.cookieName)) {
                new Growthbeat.HeaderView().show(growthbeatElement);
                return;
            }

            Growthbeat.Xdm.request('GET', Growthbeat.baseUrl + 'xdm/accounts', {
                serviceId: Growthbeat.serviceId,
                url: location.href
            }, (body:string)=> {

                var account:Growthbeat.Account = JSON.parse(body);
                if (!account || !account.id) {
                    location.href = Growthbeat.baseUrl + 'login?seviceId=' + Growthbeat.serviceId;
                    return;
                }

                Growthbeat.Xdm.request('POST', Growthbeat.baseUrl + 'xdm/sessions', {
                    serviceId: Growthbeat.serviceId,
                    url: location.href
                }, (body:string)=> {
                    var session:Growthbeat.Session = JSON.parse(body);
                    if (session.id) {
                        Growthbeat.CookieUtils.set(Growthbeat.cookieName, session.id, Growthbeat.cookieDuration);
                        location.reload();
                    }
                }, growthbeatElement);

            }, growthbeatElement);

        }

    }

}