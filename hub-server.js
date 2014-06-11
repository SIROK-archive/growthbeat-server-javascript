(function () {
    console.log('Load hub server library');

    var bodyElement = document.body;

    var headerElement = document.createElement('div');
    headerElement.id = 'hubCommonHeader';
    bodyElement.insertBefore(headerElement, bodyElement.childNodes[0]);
}());
