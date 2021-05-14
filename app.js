require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core-discord');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const montero = './music/montero.mp3'

client.on('message', msg => {
  if (msg.content === 'cheese you later') {
    msg.reply('pong');
  }

  if (msg.content.match('montero*')) {
    numPlays = msg.content.slice(7).length
    console.log(numPlays)
    voiceChannelId = msg.member.voice.channelID;
    if(voiceChannelId) {
      const channel = msg.member.voice.channel
      channel.join().then(connection => {
          playRepeat(connection, montero, numPlays)
      }).catch(e => { 
          console.error(e);
      })
      ;
    } else {
      msg.reply('You are not connected to a voice channel')
    }
  }
});

async function playRepeat(connection, url, numPlays) {
  connection.play(url)
    .on('speaking', (speaking) => {
      if(!speaking && numPlays !== 0) {
        playRepeat(connection, url, numPlays - 1)
        console.log('repeating')
      }
    });
}

client.login(process.env.BOT_TOKEN);
