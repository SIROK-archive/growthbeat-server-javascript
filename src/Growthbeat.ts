/// <reference path="./GrowthbeatModule.d.ts"/>
/// <reference path="./CookieUtils.ts"/>
/// <reference path="./HeaderView.ts"/>
/// <reference path="./Options.ts"/>
/// <reference path="./Xdm.ts"/>

class Growthbeat {

    public static options:GrowthbeatModule.Options;
    private static growthbeatElement:HTMLElement;

    public static init(options:GrowthbeatModule.Options):void {

        console.log('Growthbeat#init');

        this.options = options;

        this.growthbeatElement = document.createElement('div');
        this.growthbeatElement.id = options.rootElementId;
        document.body.insertBefore(this.growthbeatElement, document.body.childNodes[0]);

        if (this.checkLogin()) {
            new GrowthbeatModule.HeaderView().show(this.growthbeatElement);
            return;
        }

        this.login(()=> {

        });

    }

    public static checkLogin() {
        return GrowthbeatModule.CookieUtils.get(this.options.cookieName);
    }

    public static login(callback:()=>void):void {

        console.log('Growthbeat#login');

        GrowthbeatModule.Xdm.request('GET', this.options.baseUrl + 'xdm/accounts', {
            serviceId: this.options.serviceId,
            url: location.href
        }, (body:string)=> {

            var account:GrowthbeatModule.Account = JSON.parse(body);
            if (!account || !account.id) {
                location.href = this.options.baseUrl + 'login?seviceId=' + this.options.serviceId;
                return;
            }

            GrowthbeatModule.Xdm.request('POST', this.options.baseUrl + 'xdm/sessions', {
                serviceId: this.options.serviceId,
                url: location.href
            }, (body:string)=> {
                var session:GrowthbeatModule.Session = JSON.parse(body);
                if (!session || !session.id) {
                    location.href = this.options.baseUrl + 'services/' + this.options.serviceId;
                    return;
                }
                GrowthbeatModule.CookieUtils.set(this.options.cookieName, session.id, this.options.cookieDuration);
                location.reload();
            }, this.growthbeatElement);

        }, this.growthbeatElement);

    }

    public static logout(callback:()=>void):void {
        console.log('Growthbeat#logout');
    }

}
