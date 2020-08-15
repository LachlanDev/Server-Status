const Discord = require("discord.js");
const Client = new Discord.Client();
const DBL = require("dblapi.js");
var fs = require('fs')
//Logins the bot to discord

var data = fs.readFileSync('config.txt', 'utf8');
const config = JSON.parse(data); 
console.log(config.serverip)

Client.login(config.token);


var net = require('net');
//Sets Server IP and port to ping
var hosts = [[config.serverip, config.serverport]];
Client.on('ready', async message=>{
    //Sends an editable message that will change depending on your server status 
  const msg = Client.channels.cache.get(config.channelid).send("Getting Server Status ...").then((msg)=>{
function intervalFunc() {
    hosts.forEach(function(item) {
        var sock = new net.Socket();
        sock.setTimeout(2500);
            //ONLINE
        sock.on('connect', function() {
            //If server is online logs console 
            console.log(item[0]+':'+item[1]+' is up.');
            //Edits the message
            msg.edit('Website is Online ✅')
            sock.destroy();

            //OFFLINE
        }).on('error', function(e) {
            //If server is offline logs console 
            console.log(item[0]+':'+item[1]+' is down: ' + e.message);
            //Edits the message
            msg.edit('Website is Offline ❌')
            //Sends message to user to tell them server is offline
            Client.users.cache.get(config.yourid).send('Website is Offline ❌');

            //SERVER TIMEOUT
        }).on('timeout', function(e) {
            //If server is offline - timesout logs console 
            console.log(item[0]+':'+item[1]+' is down: timeout');
            //Edits the message
            msg.edit('Website is Offline ❌')
            //Sends message to user to tell them server is offline
            Client.users.cache.get(config.yourid).send('Website is Offline ❌');
        }).connect(item[1], item[0]);
    });
  }
  setInterval(intervalFunc, 5500);
})
})

//LOGS console if sucesfully launches and adds a status
Client.on('ready', ()=>{
    console.log("BOT is online!")
    Client.user.setActivity('STATUS')
});
