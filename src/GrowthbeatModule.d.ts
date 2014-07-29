declare module GrowthbeatModule {

    var templates:{[name:string]:(params:any)=>string};

    export class Account {
        id:string;
    }

    export class Session {
        id:string;
    }

    export class Command {
        type:string;
    }

}