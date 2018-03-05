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
	bot.user.setActivity("Never say no to Panda!", {type: "WATCHING"});
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

	// if(cmd === `${prefix}report`){
	// 	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	// 	if(!rUser) return message.channel.send("Persoon niet gevonden.");
	// 	let reason = args.join(" ").slice(22);

	// 	let reportEmbed = new Discord.RichEmbed()
	// 	.setDescription("Afwezig gemeld:")
	// 	.setColor("#5856D6")
	// 	.addField("Naam:", `${rUser}`)
	// 	.addField("Afwezig gemeld door:", `${message.author}`)
	// 	.addField("In kanaal:", message.channel)
	// 	.addField("Wat er bekend is:", reason);

	// 	let afwezigheidstopic = message.guild.channels.find(`name`, "afwezigheidstopic");
	// 	if(!afwezigheidstopic) return message.channel.send("Afwezigheidstopic niet gevonden.");

	// 	message.delete().catch(O_o=>{});
	// 	afwezigheidstopic.send(reportEmbed);

	// 	return;
	// }

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
	
	if(cmd === `Nick`){

		let bicon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
		.setColor("#5856D6")
		.setThumbnail(bicon)
		.addField("Wie is Nick?", "Nick moet een ban krijgen!")

		return message.channel.send(botembed);
	}	

	if(cmd === `${prefix}commands`){

		let botembed = new Discord.RichEmbed()
		.setDescription("Beschikbare commando's")
		.setColor("#5856D6")
		.addField("Afwezig melden:", "```!report @gebruiker reden en datum```")

		return message.channel.send(botembed);
	}	
	
var http = require("http");
setInterval(function() {
    http.get("http://panda-botapp.herokuapp.com");
}, 300000);
	
});

bot.login(process.env.BOT_TOKEN);
