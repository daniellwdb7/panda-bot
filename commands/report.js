const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
		let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!rUser) return message.channel.send("Persoon niet gevonden.");
		let reason = args.join(" ").slice(22);

		let reportEmbed = new Discord.RichEmbed()
		.setDescription("Afwezig gemeld:")
		.setColor("#5856D6")
		.addField("Naam:", `${rUser}`)
		.addField("Afwezig gemeld door:", `${message.author}`)
		.addField("In kanaal:", message.channel)
		.addField("Wat er bekend is:", reason);

		let afwezigheidstopic = message.guild.channels.find(`name`, "afwezigheidstopic");
		if(!afwezigheidstopic) return message.channel.send("Afwezigheidstopic niet gevonden.");

		message.delete().catch(O_o=>{});
		afwezigheidstopic.send(reportEmbed);

		return message.channel.send(`${rUser} is afwezig gemeld! bekijk het afwezigheidstopic voor de details.`);
}

module.exports.help = {
	name: "report"
}