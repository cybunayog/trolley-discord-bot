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
import { clearInterval } from 'timers';

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

// The bots need to move to new VC's asynchronously
// For now make 2 functions that will be called

// Step 1) have the bot connect to a VC (DONE)
// Step 2) have the bot move from VC to VC (WIP)
// Step 3) detect if a user is in the VC
// Step 4) have the user move with the bot
// Step 5) if user is gone, the bot will continue its drive
async function moveUserToCampusVC(channelID) {
    // VC ID: 799674463414517761
    const campus = client.channels.cache.get(channelID);
    console.log(campus);
    if (!campus) return console.error('This channel does not exist!');
    campus.join()
        .then(connection => {
            // connected!
            console.log("Successfully connected!");
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
    console.log(colors.green(`Logged in as: ${client.user.tag}`));

    // Set the bot's activity
    client.user
        .setActivity(CONFIG.defaultActivity.message, {
            type: CONFIG.defaultActivity.type,
        });
    
    // Have bot move to East Campus FIRST
    moveUserToCampusVC("799674463414517761");

    client.setInterval(moveUserToCampusVC("799674506385555557"), 3000);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    console.log(oldState);
    console.log(newState);
    // setChannel moves the member to a different channel
    // bot's ID: 799344944623910922
});

// Login with the bot's token
client.login(CONFIG.token).then();