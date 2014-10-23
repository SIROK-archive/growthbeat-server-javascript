/// <reference path="./domains/Account.ts"/>
/// <reference path="./domains/Options.ts"/>
/// <reference path="./domains/Session.ts"/>
/// <reference path="./utils/CookieUtils.ts"/>
/// <reference path="./views/HeaderView.ts"/>
/// <reference path="./Xdm.ts"/>

class Growthbeat {

    public static options:GrowthbeatModule.Options = {
        serviceId: undefined,
        baseUrl: 'https://growthbeat.com/',
        headerHeight: 68,
        rootElementId: 'growthbeat',
        accountIdCookieName: 'growthbeat.accountId',
        sessionIdCookieName: 'growthbeat.sessionId',
        cookieDuration: 7 * 24 * 60 * 60 * 1000
    };

    private static growthbeatElement:HTMLElement;

    public static init(options:GrowthbeatModule.Options):void {

        for (var key in options)
            this.options[key] = options[key];

        this.growthbeatElement = document.createElement('div');
        this.growthbeatElement.id = this.options.rootElementId;
        document.body.insertBefore(this.growthbeatElement, document.body.childNodes[0]);

    }

    public static showHeader():void {

        if (GrowthbeatModule.CookieUtils.get(this.options.sessionIdCookieName)) {

            new GrowthbeatModule.HeaderView().show(this.growthbeatElement);

            this.getAccount((account:GrowthbeatModule.Account)=> {

                if (account == null || account.id == null) {
                    this.deleteCookies();
                    this.redirectToLogin();
                    return;
                }

                var accountId:string = GrowthbeatModule.CookieUtils.get(this.options.accountIdCookieName);
                if (accountId != account.id) {
                    this.deleteCookies();
                    this.redirectToLogin();
                    return;
                }

            });

        } else {

            this.getAccount((account:GrowthbeatModule.Account)=> {

                if (account == null || account.id == null) {
                    this.redirectToLogin();
                    return;
                }

                this.createSession((session:GrowthbeatModule.Session)=> {

                    if (!session || !session.id) {
                        this.redirectToConnect();
                        return;
                    }

                    this.setCookies(account.id, session.id);
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

    private static setCookies(accountId:string, sessionId:string):void {
        GrowthbeatModule.CookieUtils.set(this.options.accountIdCookieName, accountId, this.options.cookieDuration);
        GrowthbeatModule.CookieUtils.set(this.options.sessionIdCookieName, sessionId, this.options.cookieDuration);
    }

    private static deleteCookies():void {
        GrowthbeatModule.CookieUtils.delete(this.options.accountIdCookieName);
        GrowthbeatModule.CookieUtils.delete(this.options.sessionIdCookieName);
    }

    private static redirectToLogin():void {
        location.href = this.options.baseUrl + 'login?seviceId=' + this.options.serviceId;
    }

    private static redirectToConnect():void {
        location.href = this.options.baseUrl + 'services/' + this.options.serviceId;
    }


}
