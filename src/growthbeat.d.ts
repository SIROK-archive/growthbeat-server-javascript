declare module Growthbeat {

    var templates:{[name:string]:(params:any)=>string};
    var serviceId:string;
    var headerHeight:number;
    var rootElementId:string;
    var cookieName:string;
    var cookieDuration:number;

    export class Connection {
        id:string;
    }

}