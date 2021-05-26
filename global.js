var footer = 'PhantomBot made by jcrAggie for the PhantomAlliance. \nThis is the way.   Ver 3.0 beta';
exports.footer = footer

let Discord = require('discord.js');

const phantomBotHelp = new Discord.MessageEmbed()
        .setTitle("PhantomBot Help")
        .setTimestamp()
        .setFooter("PhantomBot made by jcrAggie for the PhantomAlliance. \nThis is the way.   Ver 3.0 beta");


exports.phantomBotHelp = phantomBotHelp

// need to create a new template for the embed with an image since images cannot be removed from embeds
const ticketEmbedTemp01 = new Discord.MessageEmbed()
        .setTitle("PhantomBot Help")
        .setTimestamp()
        .setFooter("PhantomBot made by jcrAggie for the PhantomAlliance. \nThis is the way.   Ver 3.0 beta");


exports.ticketEmbedTemp01 = ticketEmbedTemp01