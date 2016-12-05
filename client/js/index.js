window.onload = function(){
    ClientFunctions.init();
};

var ClientFunctions = function(){

    function init(){
        ConnectionHelper.connect();
        CanvasHelper.init();
    }


    return {
        init : init,
    }

}();