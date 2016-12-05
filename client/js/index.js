window.onload = function(){
    ClientFunctions.init();
};

var ClientFunctions = function(){

    function init(){
        ConnectionHelper.connect();
        
    }


    return {
        init : init,
    }

}();