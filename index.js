//Copyright Humanity 2019-probably 2067
const botconfig = require("./botconfig.json")

const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs")

const token = ''

bot.on('ready', () => {

    console.log('nigga online');
})
bot.on('ready', async () =>{

    bot.user.setGame("Accepting Requests")
    let prefix = botconfig.prefix;
    console.log
});

global.prefix = botconfig.prefx;

bot.on("message", async message => {

    if(message.author.bot) return; //so it don't loop itself
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if(cmd === `${prefix}dog`)
        return message.channel.send("dog");

    if(cmd === `${prefix}mute`){
        let muted = message.mentions.members.first();
        
        if(!muted)  return message.reply("Who?");
        let muterole = message.guild.roles.find(r => r.name.toLowerCase() === "muted");
       
        if(!muterole){
            try {
                muterole = await message.guild.createRole({
                    name: "muted",
                    permissions:[]
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole,{
                      SEND_MESSAGES: false  
                    });
                });
            }catch(e){
                console.log(e.stack);
            }
        }
        let mutetime = 5;
        console.log(muted);
        await(muted.addRole(muterole.id));
        message.reply("Muted for 5");
        setTimeout(function(){
            muted.removeRole(muterole,id)
    
        }, ms(mutetime));
    }
    if(cmd === `${prefix}reverse`)
        return message.channel.send(message.content.split("").reverse().join("").replace(/@/gm, "@\u200B"));
})

bot.login(token);
