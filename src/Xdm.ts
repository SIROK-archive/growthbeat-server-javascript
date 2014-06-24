/// <reference path="./growthbeat.d.ts"/>

module Growthbeat {

    export class Xdm {

        public static get(url:string, callback:(body:string)=>void, workingElement:HTMLElement):void {

            var element:HTMLElement = document.createElement('div');
            var html:string = '<iframe id="growthbeatXdmView" src="{{url}}" style="position: absolute; top: -10000px; height: 0px; width: 0px;"></iframe>';
            element.innerHTML = html.replace('{{url}}', url);

            var iframeElement:HTMLIFrameElement = element.getElementsByTagName('iframe')[0];

            window.addEventListener('message', (event:MessageEvent)=> {
                if (event.origin !== "http://localhost:8085")
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