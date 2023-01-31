const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Embed } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('display info about the currently playing song'),

  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId)

    if (!queue) {
      return await interaction.editReply('there are no songs in the queue')
    }

    let bar = queue.createProgressBar({
      queue: false,
      length: 19
    })

    const song = queue.current; 

    await interaction.editReply({
      embeds: [new EmbedBuilder()
      .setThumbnail(song.thumbail)
      .setDescription(`currently playing [${song.title}](${song.url})\n\n` + bar)
    ]
    })
  },
}