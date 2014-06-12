/// <reference path="./hub.d.ts"/>
/// <reference path="./Core.ts"/>

(function () {
    console.log('Load hub server library');
    new Hub.Core().start();
}());
