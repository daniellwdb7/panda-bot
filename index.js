const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

if(err) console.log(err);

let jsfile = files.filter(f => f.split(".").pop() === "js")
if(jsfile.length <= 0){
console.log("Geen commando's gevonden");
return;
}

jsfile.forEach((f, i) => {
let props = require(`./commands/${f}`);
console.log(`${f} geladen!`);
bot.commands.set(props.help.name, props);
});
});

bot.on("ready", async () => {
console.log(`${bot.user.username} is online!`);
bot.user.setActivity("Porn", {type: "WATCHING"});
});

bot.on("message", async message => {
if(message.author.bot) return;
if(message.channel.type === "dm") return;

let prefix = botconfig.prefix;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args = messageArray.slice(1);

let commandfile = bot.commands.get(cmd.slice(prefix.length));
if(commandfile) commandfile.run(bot,message,args);

module.exports.run = async (bot, message, args) => {

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.");
if(!args[0]) return message.channel.send("no");
message.channel.bulkDelete(args[0]).then(() => {
message.channel.send(`Clear ${args[0]} messages.`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
name: "clear"
}

module.exports.help = {
name: "clear"
}	

if(cmd === `${prefix}botinfo`){

let bicon = bot.user.displayAvatarURL;
let botembed = new Discord.RichEmbed()
.setDescription("Bot Info")
.setColor("#5856D6")
.setThumbnail(bicon)
.addField("Eigenaar:", "Daniell")
.addField("Naam:", bot.user.username)
.addField("Gemaakt op:", bot.user.createdAt);

return message.channel.send(botembed);
}
    
if(cmd === `${prefix}verjaardagen`){

let bicon = bot.user.displayAvatarURL;
let botembed = new Discord.RichEmbed()
.setDescription("CHECKING...")
.setColor("#5856D6")
.setThumbnail(bicon)
.addField("Verjaardagen:", "Tibby: 12-05" "Mitch: 20-01")

return message.channel.send(botembed);
}

if(cmd === `Nick`){

let bicon = bot.user.displayAvatarURL;
let botembed = new Discord.RichEmbed()
.setColor("#5856D6")
.setThumbnail(bicon)
.addField("Wie is Nick?", "Nick moet een ban krijgen!")

return message.channel.send(botembed);
}
    
if(cmd === `!console`){

let bicon = bot.user.displayAvatarURL;
let botembed = new Discord.RichEmbed()
.setColor("#5856D6")
.setThumbnail(bicon)
.addField("Status", "Reading...")

return message.channel.send(botembed);
}

if(cmd === `Gido`){

let bicon = bot.user.displayAvatarURL;
let botembed = new Discord.RichEmbed()
.setColor("#5856D6")
.setThumbnail(bicon)
.addField("Wie is Gido?", "Gido moet een ban krijgen!")

return message.channel.send(botembed);
}
if(cmd === `»returnStringfromConsolesetInterval`){

let bicon = bot.user.displayAvatarURL;
let botembed = new Discord.RichEmbed()
.setColor("#5856D6")
.setThumbnail(bicon)
.addField("Console:", "panda-bot is configured! Interval=true")

return message.channel.send(botembed);
} 
if(cmd === `»MinInterVal5`){

let bicon = bot.user.displayAvatarURL;
let botembed = new Discord.RichEmbed()
.setColor("#5856D6")
.setThumbnail(bicon)
.addField("Minutes", "Set to: 5")

return message.channel.send(botembed);
}  
  
if(cmd === `»Interval=false`){

let bicon = bot.user.displayAvatarURL;
let botembed = new Discord.RichEmbed()
.setColor("#5856D6")
.setThumbnail(bicon)
.addField("Status", "Message interval is disabled, returning to state: index.js")

return message.channel.send(botembed);
} 

if(cmd === `${prefix}idee`){

let botembed = new Discord.RichEmbed()
.setColor("#5856D6")
.addField("Heb jij een geweldig idee?", "In deze chat kan jij je geweldige idee voor de kamer melden!")

return message.channel.send(botembed);
}	  
  
if(cmd === `${prefix}idee`){

let botembed = new Discord.RichEmbed()
.setColor("#5856D6")
.addField("Heb jij een geweldig idee?", "In deze chat kan jij je geweldige idee voor de kamer melden!")

return message.channel.send(botembed);
}

if(cmd === `${prefix}dealer`){

let botembed = new Discord.RichEmbed()
.setColor("#5856D6")
.addField("Wil jij ons jaloers maken?", "Hier kan je dealers melden die je hebt aangenomen!")

return message.channel.send(botembed);
}	  
  
if(cmd === `${prefix}botconsole`){

let botembed = new Discord.RichEmbed()
.setColor("#5856D6")
.addField("Status", "Reading...")

return message.channel.send(botembed);
}  
  
if(cmd === `${prefix}scam`){

let botembed = new Discord.RichEmbed()
.setColor("#5856D6")
.addField("Heeft er iemand gescamt?", "Hier kan je alle scams met belangrijke details melden.")

return message.channel.send(botembed);
}	  
  
if(cmd === `${prefix}commands`){

let botembed = new Discord.RichEmbed()
.setDescription("Beschikbare commando's")
.setColor("#5856D6")
.addField("Afwezig melden:", "```!report @gebruiker reden en datum```")

return message.channel.send(botembed);
}	
});


bot.login(process.env.BOT_TOKEN);
