/// <reference path="./GrowthbeatModule.d.ts"/>
/// <reference path="./CookieUtils.ts"/>
/// <reference path="./Xdm.ts"/>
/// <reference path="./HeaderView.ts"/>

module GrowthbeatModule {

    export class Core {

        private element:HTMLElement;

        constructor() {
            GrowthbeatModule.baseUrl = (GrowthbeatModule.baseUrl || 'https://growthbeat.com/');
            GrowthbeatModule.headerHeight = (GrowthbeatModule.headerHeight || 68);
            GrowthbeatModule.rootElementId = (GrowthbeatModule.rootElementId || 'growthbeat');
            GrowthbeatModule.cookieName = (GrowthbeatModule.cookieName || 'growthbeat.sessionId');
            GrowthbeatModule.cookieDuration = (GrowthbeatModule.cookieDuration || 7 * 24 * 60 * 60 * 1000);
        }

        public start():void {

            var growthbeatElement:HTMLElement = document.createElement('div');
            growthbeatElement.id = GrowthbeatModule.rootElementId;
            document.body.insertBefore(growthbeatElement, document.body.childNodes[0]);

            if (GrowthbeatModule.CookieUtils.get(GrowthbeatModule.cookieName)) {
                new GrowthbeatModule.HeaderView().show(growthbeatElement);
                return;
            }

            GrowthbeatModule.Xdm.request('GET', GrowthbeatModule.baseUrl + 'xdm/accounts', {
                serviceId: GrowthbeatModule.serviceId,
                url: location.href
            }, (body:string)=> {

                var account:GrowthbeatModule.Account = JSON.parse(body);
                if (!account || !account.id) {
                    location.href = GrowthbeatModule.baseUrl + 'login?seviceId=' + GrowthbeatModule.serviceId;
                    return;
                }

                GrowthbeatModule.Xdm.request('POST', GrowthbeatModule.baseUrl + 'xdm/sessions', {
                    serviceId: GrowthbeatModule.serviceId,
                    url: location.href
                }, (body:string)=> {
                    var session:GrowthbeatModule.Session = JSON.parse(body);
                    if (!session || !session.id) {
                        location.href = GrowthbeatModule.baseUrl + 'services/' + GrowthbeatModule.serviceId;
                        return;
                    }
                    GrowthbeatModule.CookieUtils.set(GrowthbeatModule.cookieName, session.id, GrowthbeatModule.cookieDuration);
                    location.reload();
                }, growthbeatElement);

            }, growthbeatElement);

        }

    }

}