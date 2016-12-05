var ConnectionHelper = function(){
    var connection; 

    function connect(){
        connection = new WebSocket("ws://localhost:6001", "echo-protocol");

        connection.onopen = onopen;
        connection.onmessage = onmessage;
        connection.onclose = onclose;
    }

    function onopen(e){
        connection.send("Hello world");
    }

    function onmessage(e){
        console.log(e);
    }

    function onclose(e){
        
    }

    return {
        connect : connect,
    }
}();