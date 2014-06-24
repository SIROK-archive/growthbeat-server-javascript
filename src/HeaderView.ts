/// <reference path="./growthbeat.d.ts"/>

module Growthbeat {

    export class HeaderView {

        private element:HTMLElement;

        constructor() {
        }

        public show(rootElement:HTMLElement):void {

            this.element = document.createElement('div');
            var html:string = '<iframe id="growthbeatHeaderView" src="http://localhost:8085/header?height={{height}}" allowtransparency="true" style="width: 100%; height: {{height}}px; border-style: none; position: fixed; top: 0px; padding: 0px; margin: 0px; z-index: 100000;"></iframe><div style="width: 100%; height: {{height}}px;"></div>';

            this.element.innerHTML = html.replace('{{height}}', Growthbeat.headerHeight.toString());

            var iframeElement:HTMLIFrameElement = this.element.getElementsByTagName('iframe')[0];

            window.addEventListener('message', (event:MessageEvent)=> {
                if (event.origin !== "http://localhost:8085")
                    return;
                if (event.source != iframeElement.contentWindow)
                    return;
                // TODO Controll open/close
                console.log('Receive message: ' + event.data);
                open();
            }, false);

            rootElement.appendChild(this.element);

        }

        private open():void {
            var iframeElement:HTMLIFrameElement = this.element.getElementsByTagName('iframe')[0];
            iframeElement.style.height = window.innerHeight + 'px';
        }

        private close():void {
            var iframeElement:HTMLIFrameElement = this.element.getElementsByTagName('iframe')[0];
            iframeElement.style.height = Growthbeat.headerHeight + 'px';
        }

    }

}