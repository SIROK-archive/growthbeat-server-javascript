/// <reference path="./GrowthbeatModule.d.ts"/>

module GrowthbeatModule {

    export class Url {
        scheme:string;
        domain:string;
        port:number;
    }

    export class HttpUtils {

        public static parseUrl(url:string):GrowthbeatModule.Url {

            var matches = url.match(/^(([^:\/?#]+):\/\/)?([^:\/?#]+)(:([0-9]+))?\/?/);

            return {
                scheme: matches[2] ? matches[2] : undefined,
                domain: matches[3] ? matches[3] : undefined,
                port: matches[5] ? parseInt(matches[5]) : undefined
            };

        }

    }

}