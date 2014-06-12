/// <reference path="./hub.d.ts"/>

module Hub {

    export class HeaderView {

        private element:HTMLElement;

        constructor() {
        }

        public show(rootElement:HTMLElement):void {

            this.element = document.createElement('div');
            this.element.innerHTML = Hub.templates['HeaderView']({
                height: Hub.headerHeight
            });

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
            iframeElement.style.height = Hub.headerHeight + 'px';
        }

    }

}