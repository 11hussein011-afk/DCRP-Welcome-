const { Client, GatewayIntentBits, EmbedBuilder, Events } = require('discord.js');
const { token } = require('./confing.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.once(Events.ClientReady, (readyClient) => {
    console.log(`✅ Logged in as: ${readyClient.user}`);
});

client.on(Events.GuildMemberAdd, async member => {
    const channelId = '1482772628329726113'; 
    const channel = member.guild.channels.cache.get(channelId);

    if (channel) {
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#de1b09')
            .setTitle('Welcome To Dark Circle RP')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: '┃ Member Information', value: `User: ${member}\nTag: ${member.user.username}\nID: ${member.id}`, inline: true },
                { name: '┃ Account Details', value: `Member: ${member.guild.memberCount}`, inline: true }
            )
            // رابط الصورة المباشر الذي استخرجناه
            .setImage('https://i.postimg.cc/rFxFN84j/Screenshot-2026-03-12-180445.png') 
            .setFooter({ text: `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}` });

        channel.send({ content: `Welcome ${member}`, embeds: [welcomeEmbed] });
    }

    // إعطاء الرتبة تلقائياً
    const roleId = '1482795208562184323';
    member.roles.add(roleId).catch(() => console.log("❌ تأكد من صلاحيات رتبة البوت"));
});

client.login(token);