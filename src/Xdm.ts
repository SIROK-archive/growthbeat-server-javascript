/// <reference path="./growthbeat.d.ts"/>
/// <reference path="./HttpUtils.ts"/>
/// <reference path="./Template.ts"/>

module Growthbeat {

    export class Xdm {

        private static template = Growthbeat.Template.compile('<iframe id="growthbeatXdmView" src="{url}" style="position: absolute; top: -10000px; height: 0px; width: 0px;"></iframe>');

        public static get(url:string, callback:(body:string)=>void, workingElement:HTMLElement):void {

            var element:HTMLElement = document.createElement('div');
            element.innerHTML = this.template({
                url: url
            });

            var iframeElement:HTMLIFrameElement = element.getElementsByTagName('iframe')[0];

            window.addEventListener('message', (event:MessageEvent)=> {
                var originDomain = Growthbeat.HttpUtils.parseUrl(event.origin).domain;
                var baseDomain = Growthbeat.HttpUtils.parseUrl(Growthbeat.baseUrl).domain;
                if (originDomain != baseDomain)
                    return;
                if (event.source != iframeElement.contentWindow)
                    return;
                callback(event.data);
                workingElement.removeChild(element);
            }, false);

            workingElement.appendChild(element);

        }

    }

}