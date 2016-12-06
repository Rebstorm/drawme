module.exports.handleUTF8 = handleUTF8;


var userList = [];

function handleUTF8(data, user){
    var json = JSON.parse(data);
    if(json.type == undefined)
        return;

    switch(json.type){

        case "greeting":
            handleNewUser(json, user);
            break;
        
        case "draw":
            handleDrawEvent(json, user);
            break;

        default:
            break;

    }
}


function handleDrawEvent(data, user){

   for(var i = 0; i < userList.length; i++){
        if(userList[i].guid == data.guid){
            continue;
            console.log("user found");
        }else{
            userList[i].userData.sendUTF(JSON.stringify(data));
        }
    }
}

function handleNewUser(data, user){
    var newUser = { guid: data.guid, userData: user };
    console.log(newUser.guid);
    for(var i = 0; i < userList.length; i++){
        if(userList[i].guid == data.guid){
            userList[i] = newUser;
            console.log("already existing user found, readding");
            return;
        }
    }
    userList.push(newUser);
    console.log("new user found");

}