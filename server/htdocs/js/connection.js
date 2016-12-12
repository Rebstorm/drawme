var ConnectionHelper = function(){
    var connection; 
    var guid;

    function connect(guid){
        try{
            connection = new WebSocket("ws://localhost:6001", "draw-protocol");

            connection.onopen = onopen;
            connection.onmessage = onmessage;
            connection.onclose = onclose;
        } catch(e){
            throw new ConnectionHelperException();
        }
    }

    function onopen(e){

        var uguid = localStorage.getItem("guid");

        if(uguid == undefined){
            localStorage.setItem("guid", guid());
            uguid = localStorage.getItem("guid");
        }

        var msg = {
            type: "greeting",
            data: "1",
            guid: getGUUID(),
        }
        connection.send(JSON.stringify(msg));
    }

    function onmessage(e){
        var json = JSON.parse(e.data);
        CanvasHelper.addPaintRemote(json.x, json.y, json.dragging);
    }

    function onclose(e){

    }
    
    function getConnection(){
        if(connection != undefined)
            return connection;
        else{        
            connect(ClientFunctions.guid);
            return connection;
        }
            
    }


    function getGUUID(){
        var uguid = localStorage.getItem("guid");

        if(uguid == undefined){
            localStorage.setItem("guid", guid());
            uguid = localStorage.getItem("guid");
        }

        return uguid;
    }

    function send(data){
        if(typeof data == "object"){
            data.guid = getGUUID();
            data = JSON.stringify(data);
        }

        if(getConnection() != undefined)   
            connection.send(data)
        
        else
            throw new ConnectionHelperException();
    }

    function ConnectionHelperException(){
        this.message = "error, cannot connect - herp derp";
        return this;
    }

    function guid() {

      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    return {
        connect : connect,
        send : send,
    }
}();