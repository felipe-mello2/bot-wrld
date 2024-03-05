const { Player } = require('discord-player');
const Genius = require("genius-lyrics");
const { Client, GatewayIntentBits } = require('discord.js');
const ytdl = require('ytdl-core');
const keep_alive = require('./keep_alive.js')

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');

// Set YTDL_NO_UPDATE environment variable
process.env.YTDL_NO_UPDATE = true;

const player = new Player(client, client.config.opt.discordPlayer);
global.genius = new Genius.Client();
player.extractors.loadDefault();

async function downloadVideo(videoURL) {
    try {
        const info = await ytdl.getInfo(videoURL);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
        // Rest of your code for downloading the video
    } catch (error) {
        if (error.message === 'ERR_NO_RESULT') {
            console.error('Could not extract stream for this track');
            // Handle this specific error case
        } else {
            console.error('An error occurred:', error.message);
            // Handle other errors
        }
    }
}

require('./src/loader');

client.login(client.config.app.token);
