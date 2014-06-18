declare module Growthbeat {
    var templates:{[name:string]:(params:any)=>string};
    var applicationId:string;
    var serviceId:string;
    var headerHeight:number;
    var rootElementId:string;
    var authorizationCookieName:string;
    var authorizationCookieExpiry:number;
}