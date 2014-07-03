/// <reference path="./growthbeat.d.ts"/>
/// <reference path="./HttpUtils.ts"/>
/// <reference path="./Template.ts"/>

module Growthbeat {

    export class Xdm {

        private static template = Growthbeat.Template.compile('<form method="{method}" action="{url}" target="{target}"></form><iframe id="growthbeatXdmView" name="{target}" style="position: absolute; top: -10000px; height: 0px; width: 0px;"></iframe>');

        public static request(method:string, url:string, callback:(body:string)=>void, workingElement:HTMLElement):void {

            var element:HTMLElement = document.createElement('div');
            element.innerHTML = this.template({
                method: method,
                url: url,
                target: 'growthbeatXdmView' + Math.round(Math.random() * 1e8)
            });

            var formElement:HTMLFormElement = element.getElementsByTagName('form')[0];
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
            formElement.submit();

        }

    }

}