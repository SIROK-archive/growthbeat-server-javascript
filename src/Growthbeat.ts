/// <reference path="./GrowthbeatModule.d.ts"/>
/// <reference path="./CookieUtils.ts"/>
/// <reference path="./HeaderView.ts"/>
/// <reference path="./Options.ts"/>
/// <reference path="./Xdm.ts"/>

class Growthbeat {

    public static options:GrowthbeatModule.Options = {
        serviceId: undefined,
        baseUrl: 'https://growthbeat.com/',
        headerHeight: 68,
        rootElementId: 'growthbeat',
        cookieName: 'growthbeat.sessionId',
        cookieDuration: 7 * 24 * 60 * 60 * 1000
    };

    private static growthbeatElement:HTMLElement;

    public static init(options:GrowthbeatModule.Options):void {

        for (var key in options)
            this.options[key] = options[key];

        this.growthbeatElement = document.createElement('div');
        this.growthbeatElement.id = options.rootElementId;
        document.body.insertBefore(this.growthbeatElement, document.body.childNodes[0]);

    }

    public static showHeader():void {

        if (GrowthbeatModule.CookieUtils.get(this.options.cookieName)) {

            new GrowthbeatModule.HeaderView().show(this.growthbeatElement);

            this.getAccount((account:GrowthbeatModule.Account)=> {
                if (!account || !account.id) {
                    GrowthbeatModule.CookieUtils.delete(this.options.cookieName);
                    location.reload();
                }
            });

        } else {

            this.getAccount((account:GrowthbeatModule.Account)=> {

                if (!account || !account.id) {
                    location.href = this.options.baseUrl + 'login?seviceId=' + this.options.serviceId;
                    return;
                }

                this.createSession((session:GrowthbeatModule.Session)=> {

                    if (!session || !session.id) {
                        location.href = this.options.baseUrl + 'services/' + this.options.serviceId;
                        return;
                    }

                    GrowthbeatModule.CookieUtils.set(this.options.cookieName, session.id, this.options.cookieDuration);
                    location.reload();

                });

            });

        }

    }

    public static getAccount(callback:(account:GrowthbeatModule.Account)=>void):void {

        GrowthbeatModule.Xdm.request('GET', this.options.baseUrl + 'xdm/accounts', {
            serviceId: this.options.serviceId,
            url: location.href
        }, (body:string)=> {
            var account:GrowthbeatModule.Account = JSON.parse(body);
            callback(account);
        }, this.growthbeatElement);

    }

    public static createSession(callback:(session:GrowthbeatModule.Session)=>void):void {

        GrowthbeatModule.Xdm.request('POST', this.options.baseUrl + 'xdm/sessions', {
            serviceId: this.options.serviceId,
            url: location.href
        }, (body:string)=> {
            var session:GrowthbeatModule.Session = JSON.parse(body);
            callback(session);
        }, this.growthbeatElement);

    }

}
