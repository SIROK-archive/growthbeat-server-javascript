(function () {

    console.log('Load hub server library');

    var bodyElement:HTMLElement = document.body;

    var headerElement:HTMLElement = document.createElement('div')
    headerElement.id = 'hubCommonHeader'
    bodyElement.insertBefore(headerElement, bodyElement.childNodes[0]);

}());
