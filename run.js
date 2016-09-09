(function () {
    var elem = document.getElementById('mainLoadingToast');
    elem.parentNode.removeChild(elem);

    app.router.start(app, 'body');
}());
