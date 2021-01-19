/**
 *  app.js
 *
 *  Discord bot template.
 */

// Library Imports
import dotenv from 'dotenv';
dotenv.config();
import colors from 'chalk';
import { Client } from 'discord.js';

// Global Properties
const campus = ["West Campus", "East Campus"]
const CONFIG = {
    token: process.env.BOT_TOKEN,
    defaultActivity: {
        type: "WATCHING",
        message: campus[Math.floor(Math.random() * campus.length)],
    }
}

// Built-in functions

// The bots need to move to new VC's asynchronously
// For now make 2 functions that will be called

// TODO: Step 1) have the bot connect to a VC (DONE)
// TODO: Step 2) have the bot move from VC to VC (ALMOST DONE)
// TODO: Step 3) detect if a user is in the VC
// TODO: Step 4) have the user move with the bot (it technically already does that with the "voice state" function)
// TODO: Step 5) if user is gone, the bot will continue its drive

// moves users with bot to VC
async function moveUserToCampusVC(channelID) {
    // VC ID: 799674463414517761
    
}

// Bot joins VC
async function joinCampusVC(channelID) {
    const vcCampus = channelID;
    if (!vcCampus) return console.error('This channel does not exist!');
    vcCampus.join()
        .then(connection => {
            // connected!
            console.log(`Successfully connected at ${connection.channel.name}!`);
        })
        .catch(e => {
            // not connected
            console.error(e);
        });
}

/**************************
 * Discord Initialization *
 **************************/

const trolleyBot = new Client();

// Handle bot connected to the server
trolleyBot.on("ready", () => {
    // VC Objects
    const east = trolleyBot.channels.cache.get("799674463414517761"),
        west = trolleyBot.channels.cache.get("799674506385555557");
    
    const vcArr = [east, west, east, west];
    console.log(colors.green(`Logged in as: ${trolleyBot.user.tag}`));

    // Set the bot's activity
    trolleyBot.user
        .setActivity(CONFIG.defaultActivity.message, {
            type: CONFIG.defaultActivity.type,
        });
    
    // Have bot move to East Campus FIRST
    joinCampusVC(vcArr[0]);

    // Make the switch 10 seconds, for now (It will switch every 5 mins)
    // TODO: Make sure the bot doesn't repeat
    // if bot is already connected to that channel, make the switch to a new channel
    let trolleyBotConnectedVC = trolleyBot.voice.connections;
    setInterval(() => {
        joinCampusVC(vcArr[Math.floor(Math.random() * vcArr.length)]);
    }, 10 * 1000);
});

trolleyBot.on('voiceStateUpdate', (oldState, newState) => {
    // console.log(oldState);
    // console.log(newState);
    // setChannel moves the member to a different channel
    // bot's ID: 799344944623910922
});

// Login with the bot's token
trolleyBot.login(CONFIG.token).then();