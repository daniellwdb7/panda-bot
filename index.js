const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const ms = require ("ms");
const bot = new Discord.Client({disableEveryone: true});
let coins = require("./coins.json");

bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);

	bot.user.setActivity("in Golden Palace", {type: "PLAYING"});
});

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	if(!coins[message.author.id]){
		coins[message.author.id] = {
			coins: 0
		};
	}

	let coinAmt = Math.floor(Math.random() * 15) + 1;
	let baseAmt = Math.floor(Math.random() * 15) + 1;
	console.log(`${coinAmt} ; ${baseAmt}`);

	if(coinAmt === baseAmt){
		coins[message.author.id] = {
			coins: coins[message.author.id]. coins + coinAmt
		};
		fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
			if (err) console.log(err)
		});
		let coinEmbed = new Discord.RichEmbed()
		.setAuthor(message.author.username)
		.setColor("#4B0082")
		.addField("💸", `${coinAmt} Punten verdiend!`);

		message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
	}

	if(cmd === `${prefix}serverinfo`){

		let sicon = message.guild.iconURL;
		let serverembed = new Discord.RichEmbed()
		.setDescription("Server informatie")
		.setColor("#4B0082")
		.setThumbnail(sicon)
		.addField("Server naam", message.guild.name)
		.addField("Gemaakt op", message.guild.createdAt)
		.addField("Jij werd lid op", message.member.joinedAt)
		.addField("Aantal leden", message.guild.memberCount);

		return message.channel.send(serverembed);
	}

	if(cmd === `${prefix}tempmute`){
		let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!tomute) return message.reply("Gebruiker niet gevonden");
		if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Je hebt hier geen rechten voor!");
		let muterole = message.guild.roles.find(`name`, "Muted");
		if(!muterole){
			try {
				muterole = await message.guild.createRole( {
					name: "muted",
					color: "#000000",
					permissions:[]
				})
				message.guild.channels.forEach(async (channel, id) => {
					await channel.overwritePermission(muterole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false
					});
				});
			}catch(e){
				console.log(e.stack);
			}
		}
		let mutetime = args[1];
		if(!mutetime) return message.reply("Je hebt geen tijd gekozen");

		await(tomute.addRole(muterole.id));
		message.reply(`<@${tomute.id}> Is gemute voor ${ms(mutetime)}`);

		setTimeout(function(){
			tomute.removeRole(muterole.id);
			message.channel.send(`<@${tomute.id}> Kan weer praten`);
		}, ms(mutetime));
	}	

	if(cmd === `${prefix}punten`){
	if(!coins[message.author.id]){
		coins[message.author.id] = {
			coins: 0
		};
	}

	let uCoins = coins[message.author.id].coins;

	let coinEmbed = new Discord.RichEmbed()
	.setAuthor(message.author.username)
	.setColor("#00FF00")
	.addField("💸", uCoins);

	message.channel.send(coinEmbed);
	}	

	if(cmd === `${prefix}report`){
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!rUser) return message.channel.send("Geen persoon gevonden.");
		let reason = args.join(" ").slice(22);

		let reportEmbed = new Discord.RichEmbed()
		.setDescription("Er is iemand afwezig gemeld")
		.setColor("#4B0082")
		.addField("Afwezig gemeld", `${rUser} met ID: ${rUser.id}`)
		.addField("Afwezig gemeld door", `${message.author} met ID: ${message.author.id}`)
		.addField("In kanaal", message.channel)
		.addField("Reden", reason);

		let afwezigheidstopic = message.guild.channels.find(`name`, "afwezigheidstopic");
		if(!afwezigheidstopic) return message.channel.send("Ik kan het afwezigheidstopic niet vinden.");

		message.delete().catch(O_o=>{});
		afwezigheidstopic.send(reportEmbed);
		message.channel.send(`${rUser} is afwezig gemeld! bekijk het afwezigheidstopic voor de details.`);
	}	

	if(cmd === `${prefix}hallo`){
		return message.channel.send("Hallo!");
	}
	if(cmd === `${prefix}botinfo`){

		let bicon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
		.setDescription("Bot informatie")
		.setColor("#4B0082")
		.setThumbnail(bicon)
		.addField("Bot naam", bot.user.username)
		.addField("Gemaakt op", bot.user.createdAt);

		return message.channel.send(botembed);
	}
});

bot.login(botconfig.token);