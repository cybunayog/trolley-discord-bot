/**
 *  app.js
 *
 *  Discord bot template.
 */

// Library Imports
import dotenv from 'dotenv'
dotenv.config();
import { Client } from 'discord.js';

// Global Properties
const activities = ["West Campus", "East Campus"]
const CONFIG = {
    token: process.env.BOT_TOKEN,
    defaultActivity: {
        type: "STREAMING",
        message: activities[Math.floor(Math.random() * activities.length)],
    }
}

// Built-in functions
/**
 *  Handle a command from a Discord user.
 *
 *  @param  {Object}    msg         The message object. https://discord.js.org/#/docs/main/stable/class/Message
 *  @param  {String}    command     The `commandName` part of the message.
 *  @param  {Array}     args        The optional list of arguments from the message.
 *
 *  @note - Discord messages which are treated as commands are expected to look like: "+commandName arg1 arg2 arg3".
 */
// function handleCommand(msg, cmd, args) {
//     const channel = msg.channel;
//     let query = args[0];
//     let response = args[0] + " " + args[1];
    
//     switch (cmd) {
//         case "switch":
           
//         default:
//             handleErrorMessage(cmd);
//             break;
//     }
// }
// /**
//  *  Print a Discord message to the console with colors for readability.
//  *
//  *  @param  {Object}  msg   The message object.
//  */
// function logMessageWithColors(msg) {
//     const d = new Date(msg.createdTimestamp),
//         h = d.getHours(),
//         m = d.getMinutes(),
//         s = d.getSeconds(),
//         time = colors.grey(`[${h}:${m}:${s}]`),
//         author = colors.cyan(`@${msg.author.username}`);

//     console.log(`${time} ${author}: ${msg.content}`);
// }

// /**
//  * Handles error messages
//  * 
//  * @param {Object} msg  The message object. https://discord.js.org/#/docs/main/stable/class/Message
//  * @param {String} cmd  The `commandName` part of the message.
//  */
// function handleErrorMessage(cmd) {
//     const channel = msg.channel;
//     if (channel.type === 'dm') {
//         msg.reply(
//             `I'm sorry, the command '+${cmd}' does not exist :frowning2: Go ahead and try again!`
//         );
//     }
// }

/**************************
 * Discord Initialization *
 **************************/

const client = new Client();

// Handle bot connected to the server
client.on("ready", () => {
    console.log(colors.green(`Logged in as: ${client.user.tag}`));

    // Set the bot's activity
    client.user
        .setActivity(CONFIG.defaultActivity.message, {
            type: CONFIG.defaultActivity.type,
        })
        .then();
});

// Handle message from user
client.on("message", (msg) => {
    // logMessageWithColors(msg);

    // // Message is a command (preceded by an plus mark)
    // if (msg.content[0] === "+") {
    //     let words = msg.content.split(" "),
    //         cmd = words.shift().split("+")[1], // First word, sans plus mark
    //         args = words; // Everything after first word as an array

    //     handleCommand(msg, cmd, args);
    //     return;
    // }
});

// Login with the bot's token
client.login(CONFIG.token).then();