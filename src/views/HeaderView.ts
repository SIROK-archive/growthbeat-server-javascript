/// <reference path="./../domains/Options.ts"/>
/// <reference path="./../domains/Command.ts"/>
/// <reference path="./../utils/HttpUtils.ts"/>
/// <reference path="./../Template.ts"/>

module GrowthbeatModule {

    export class HeaderView {

        private element:HTMLElement;
        private iframeElement:HTMLIFrameElement;
        private opened:boolean = false;

        private template = Template.compile('<iframe id="growthbeatHeaderView" src="{baseUrl}header/?serviceId={serviceId}&height={height}&background={background}" allowtransparency="true" style="width: 100%; height: {height}px; border-style: none; position: fixed; top: 0px; padding: 0px; margin: 0px; z-index: 100000;"></iframe><div style="width: 100%; height: {height}px;"></div>');

        constructor() {
        }

        public show(rootElement:HTMLElement):void {

            this.element = document.createElement('div');
            this.element.innerHTML = this.template({
                baseUrl: Growthbeat.options.baseUrl,
                serviceId: Growthbeat.options.serviceId,
                height: Growthbeat.options.headerHeight,
                background: Growthbeat.options.background
            });

            this.iframeElement = this.element.getElementsByTagName('iframe')[0];

            window.addEventListener('message', (event:MessageEvent)=> {
                var originDomain = HttpUtils.parseUrl(event.origin).domain;
                var baseDomain = HttpUtils.parseUrl(Growthbeat.options.baseUrl).domain;
                if (originDomain != baseDomain)
                    return;
                if (event.source != this.iframeElement.contentWindow)
                    return;
                var command:Command = JSON.parse(event.data);
                switch (command.type) {
                    case 'open':
                        this.opened = true;
                        break;
                    case 'close':
                        this.opened = false;
                        break;
                }
                this.rerender();
            }, false);

            window.addEventListener('resize', (event:Event)=> {
                this.rerender();
            }, false);

            rootElement.appendChild(this.element);

        }

        private rerender():void {
            this.iframeElement.style.height = (this.opened ? window.innerHeight : Growthbeat.options.headerHeight) + 'px';
        }

    }

}
