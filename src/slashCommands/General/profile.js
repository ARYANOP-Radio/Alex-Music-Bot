const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const User = require("../../schema/User.js")
const prettyMiliSeconds = require("pretty-ms");
const day = require("dayjs");
const premiumUser = require("../../schema/premium-user.js")
module.exports = {
    name: "profile",
    description: "Shows your profile",
    wl : true,

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
          ephemeral: false
        });
          
      
        let owner = client.emoji.owner
        let dev = client.emoji.developer
        let bug = client.emoji.bughunter
        let sup = client.emoji.supporter
        let prem = client.emoji.premium
        let staff = client.emoji.staff
        let manager = client.emoji.manager
        let partner = client.emoji.partner
        let booster = client.emoji.booster
        let vip = client.emoji.vip

        let cache = []
        let member = interaction.member
        let data = await User.findOne({ userId: member.id });
        if (!data) data = await User.create({ userId: member.id });


if(data.badge.owner){
    cache.push(`${owner} Owner`)
}
if(data.badge.dev){
    cache.push(`${dev} Verified Bot Developer`)
}
if(data.badge.supporter){
    cache.push(`${sup} Supporter`)
}
if(data.badge.bug){
    cache.push(`${bug} Bug Hunter`)
}
if(data.badge.premium){
    cache.push(`${prem} Premium User`)
}

if(data.badge.manager){
    cache.push(`${manager} Manager`)
}
if(data.badge.partner){
    cache.push(`${partner} Partnered Member`)
}
if(data.badge.staff){
    cache.push(`${staff} Staff Member`)
}
if(data.badge.booster){
    cache.push(`${booster} Server Booster`)
}
if(data.badge.vip){
    cache.push(`${vip} Guest`)
}

    if(cache.length ===0){
        cache.push(`you have no achievements in ${client.user.username}! Don't Worry [click here](https://discord.gg/pCj2UBbwST) to buy premium and get some achievements in ${client.user.username}..! `)
    }



  // paras turorial e kadha  yes haan nenu chestanu le aiythe nuvu a lag rdp lo endhuku kasta padthav nibba 🥲
  const isPremium = await premiumUser.findOne({
    UserID: member.id,
  });

  let cache1 = []
if(isPremium && !isPremium.Permanent){
    cache1.push(`\`Validity\` : ${prettyMiliSeconds(isPremium.Expire-Date.now())}`)
}
if(isPremium && isPremium.Permanent){
    cache1.push(`\`Validity\` : Permanent Subscription`)
}






 
 if (!isPremium) {
    cache1.push(`You don't have any active user premium subscription. [Click here](https://discord.gg/pCj2UBbwST) to buy one.
    `)
 }
 let cache2 = []
 const voteok = await client.topgg.hasVoted(member.id)
 if(!voteok){
    cache2.push(`\`Not Voted\` \nYou Can't use any premium command if you don't have a active user premium subscription.`)
 }
 if(voteok){
    cache2.push(`\`Voted\`\n You can use all premium commands for 12 hours.`)
 }


        var profile  = new MessageEmbed()
        .setColor(client.embedColor)
        .setThumbnail("https://cdn.discordapp.com/icons/855371828130217984/a_219d3c73b38d54a222a4c75046164e8c.gif?size=1024")
        .setAuthor(`Alex Music Profile Of ${member.user.username}`)
        .addField("Commands used",`${data.count}`)
        .addField(`Achievements of ${member.user.username}`,cache.join("\n"))
        .addField(`Premium Status`,cache1.join("\n"))
        .addField(`Has Voted?`,cache2.join("\n"))
      
 
.setColor(client.embedColor)
        await interaction.followUp({embeds: [profile]})
    }
}
