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

// Step 1) have the bot connect to a VC (DONE)
// Step 2) have the bot move from VC to VC (ALMOST DONE)
// Step 3) detect if a user is in the VC
// Step 4) have the user move with the bot (it technically already does that with the "voice state" function)
// Step 5) if user is gone, the bot will continue its drive

// moves users with bot to VC
async function moveUserToCampusVC(channelID) {
    // VC ID: 799674463414517761
    
}

// Bot joins VC
async function joinCampusVC(channelID) {
    const campus = channelID;
    if (!campus) return console.error('This channel does not exist!');
    campus.join()
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

const client = new Client();

// Handle bot connected to the server
client.on("ready", () => {
    // VC Objects
    const east = client.channels.cache.get("799674463414517761"),
        west = client.channels.cache.get("799674506385555557");
    
    const vcArr = [east, west, east, west];
    console.log(colors.green(`Logged in as: ${client.user.tag}`));

    // Set the bot's activity
    client.user
        .setActivity(CONFIG.defaultActivity.message, {
            type: CONFIG.defaultActivity.type,
        });
    
    // Have bot move to East Campus FIRST
    joinCampusVC(vcArr[0]);

    // Make the switch 10 seconds -> FIX THIS TO BE EXACT
    setInterval(() => {
        joinCampusVC(vcArr[Math.floor(Math.random() * vcArr.length)]);
    }, 10 * 1000);

    // client.setInterval(moveUserToCampusVC("799674506385555557"), 3000);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    // console.log(oldState);
    // console.log(newState);
    // setChannel moves the member to a different channel
    // bot's ID: 799344944623910922
});

// Login with the bot's token
client.login(CONFIG.token).then();