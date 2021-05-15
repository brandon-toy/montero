require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
let percent = 10
let CheeseFlag = 1
let CheeseUser = '320449161776594945'
let GuildId = '691146462217633792'
const CheeseLog = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activity: { name: 'Montero' } })
});

let numPlays = 0
const montero = './music/montero.mp3'

client.on('message', msg => {
  if (msg.content === 'cheese you later') {
    msg.reply('pong');
  }
  
  if (msg.content.match('monter(o){0,}')) {
    let monteroPlays = msg.content.match('monter(o){0,}')[0]
    console.log(monteroPlays)
    if(numPlays > 0) {
      numPlays += monteroPlays.slice(6).length
      msg.reply('Increased number of plays to: ' +numPlays)
    } else {
      numPlays += monteroPlays.slice(6).length
      msg.reply("Aight, playing "+ numPlays + " times")
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
  }
  
  if(msg.content == '!cheese you later andrew') {
  msg.reply('Alright, cheese you later intiated at ' + percent)
    CheeseFlag = 1
  }
  
  
  cheeseCommands = msg.content.split(" ")
  console.log(cheeseCommands)
  if(cheeseCommands[0] == '!cheese') {

    if(cheeseCommands[1] == 'percent') {
      if(cheeseCommands[2] && msg.member.user.id == '226160009304604672') {
        percent = parseInt(cheeseCommands[2])
        msg.reply('Turned cheese percent to: '+ percent + '%')
      } else {
        msg.reply('Lmao try next time')
      }
    } 

    if(cheeseCommands[1] == 'off') {
      if(msg.member.user.id == '226160009304604672') {
        msg.reply('Cheese turned off')
        CheeseFlag = 0
      } else {
        msg.reply('Hahahaha you trying to turn it off andrew?')
      }
    }

    if(cheeseCommands[1] == 'set') {
      if(cheeseCommands[2] && msg.member.user.id == '226160009304604672') {
        CheeseUser = cheeseCommands[2]
        const Guild = client.guilds.cache.get(GuildId); // Getting the guild.
        const Member = Guild.members.cache.get(CheeseUser); // Getting the member.
        msg.reply('Set cheese user to: ' + Member.user.username)
      } else {
        msg.reply('Lmao try next time')
      }
    }
    if(cheeseCommands[1] == 'log') {
      str = '\n```\n'
      console.log(CheeseLog)
      CheeseLog.forEach((item, index) => {
        str = str.concat(item + '\n')
      })  
      str = str.concat('```')
      msg.reply(str)
    }
    
    if(cheeseCommands[1] == 'user') {
      const Guild = client.guilds.cache.get(GuildId); // Getting the guild.
      const Member = Guild.members.cache.get(CheeseUser); // Getting the member.
      msg.reply('Current cheese user: '+ Member.user.username)
    }
  }

  
  client.on("guildMemberSpeaking", (member, speaking) => {
    roll = Math.floor(Math.random() * 400) + 1 
    if(CheeseFlag && member.user.id == CheeseUser && speaking == 1) {
      CheeseLog.push(Math.floor(roll/4))
      console.log(roll)
    }
    if(CheeseFlag && member.user.id == CheeseUser && speaking == 1 && roll <= percent) {
      member.voice.kick()
      console.log('kicked!')
    }
  })
});


async function playRepeat(connection, url) {
  
  connection.play(url)
  .on('speaking', (speaking) => {
    if(!speaking && numPlays !== 0) {
      playRepeat(connection, url)
        numPlays -= 1
        console.log('repeating')
      }
    });
}

client.login(process.env.BOT_TOKEN);
