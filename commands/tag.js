var MongoClient = require('mongodb').MongoClient;
const { mongodbase, currentdb } = require('../config.json');
const package = require('../package.json');
const Discord = require('discord.js');
module.exports = {
    name: 'tag',
    description: 'Commands to provide help.',
    usage: ['(tag name)'],
    cooldown: 1,
    guildOnly: true,
    aliases: ['tags', 't'],
    execute(message, args) {
        if (args.length) {
            MongoClient.connect(mongodbase, { useUnifiedTopology: true }, async function (err, db) {
                if (err) throw err;
                dbInstance = db.db(currentdb);
                const items = await dbInstance.collection("tags").findOne({ name: args.toString() });
                if (items == null) {
                    const tags = await dbInstance.collection("tags").find({}).toArray();
                    let data = "";
                    let listCount = 0;
                    tags.forEach(element => {
                        if (element.name.includes(args.toString())) {
                            data += element.name
                            listCount++;
                            if (listCount != tags.length) {
                                data += ", "
                            }
                        }
                    });
                    if (data == "") {
                        message.reply("no tags found.")
                            .then(msg => {
                                message.delete();
                                setTimeout(() => {
                                    msg.delete();
                                }, 5000);
                            })
                    } else {
                        const modEmbed = new Discord.MessageEmbed()
                            .setColor('#8A28F7')
                            .setTitle("Found tags:")
                            .setDescription(data.substring(0, data.length - 2))
                            .setTimestamp()
                            .setFooter(package.name + ' v. ' + package.version);
                        message.channel.send(modEmbed);
                        db.close();

                    }
                } else {
                    message.delete();
                    message.channel.send(eval('`' + items.content + '`'))
                }
                db.close();

                return;
            });
        } else {
            MongoClient.connect(mongodbase, { useUnifiedTopology: true }, async function (err, db) {
                if (err) throw err;
                var listCount = 0;
                dbInstance = db.db(currentdb);
                var data = '';
                dbInstance.collection("tags").find({}).toArray(function (err, result) {
                    if (err) throw err;
                    result.forEach(element => {
                        data += element.name;
                        listCount++;
                        if (listCount != result.length) {
                            data += ", "
                        }
                    });
                    const modEmbed = new Discord.MessageEmbed()
                        .setColor('#8A28F7')
                        .setTitle("Current tags:")
                        .setDescription(data)
                        .setTimestamp()
                        .setFooter(package.name + ' v. ' + package.version);
                    message.channel.send(modEmbed);
                    db.close();
                });

                return;
            });

        }
    },
};