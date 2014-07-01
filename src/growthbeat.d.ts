declare module Growthbeat {

    var templates:{[name:string]:(params:any)=>string};
    var serviceId:string;
    var baseUrl:string;
    var headerHeight:number;
    var rootElementId:string;
    var cookieName:string;
    var cookieDuration:number;

    export class Account {
        id:string;
    }

    export class Connection {
        id:string;
    }

}