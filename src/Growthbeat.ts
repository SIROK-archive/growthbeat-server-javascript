/// <reference path="./GrowthbeatModule.d.ts"/>
/// <reference path="./Options.ts"/>

class Growthbeat {

    private options:GrowthbeatModule.Options;

    public static init(options:GrowthbeatModule.Options):void {
        console.log('Growthbeat#init');
    }

    public static login(options:any, callback:()=>void):void {
        console.log('Growthbeat#login');
    }

    public static logout(options:any, callback:()=>void):void {
        console.log('Growthbeat#logout');
    }

}
