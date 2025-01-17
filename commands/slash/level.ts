import { AttachmentBuilder, SlashCommandBuilder } from "discord.js";
import { registerFont, createCanvas, loadImage } from "canvas";
import { CommandSlash, Database as DatabaseInterface } from "../../interfacies";

registerFont("./cdn/fonts/ProtestStrike.ttf", { family: "Protest Strike" }); // Load font

const properties = {
	image: {
		width: 1024,
		height: 400,
		background: "https://redeye.sleezzi.fr/cdn/img/canvas-background-level.png"
	},
	overlay: {
		get x() {
			return properties.overlay.margin;
		},
		get y() {
			return properties.overlay.margin;
		},
		get width() {
			return properties.image.width - properties.overlay.margin * 2;
		},	   
		get height() {
			return properties.image.height - properties.overlay.margin * 2;
		},
		color: "#00000050",
		margin: 15
	},
	pdp: {
		background: {
			x: 227,
			get y() {
				return properties.image.height / 2
			},
			size: 123
		},
		image: {
			get x() {
				return properties.pdp.background.x - properties.pdp.image.size
			},
			get y() {
				return properties.image.height / 2 - properties.pdp.image.size
			},
			get size() {
				return properties.pdp.background.size - 4
			}
		}
		
	},
	username: {
		x: 625,
		get y() {
			return properties.image.height / 3
		},
		size: 64,
		get lineWidth() {
			return Math.floor(properties.username.size / 20)
		},
	},
	level: {
		get x() {
			return 625 - properties.progressBar.with / 2 // => 354
		},
		get y() {
			return properties.image.height / 3 + 55 + properties.xp.size / 2
		},
		size: 35,
		get lineWidth() {
			return Math.floor(properties.level.size / 20)
		},
	},
	xp: {
		get x() {
			return properties.progressBar.x + properties.progressBar.with - 4
		},
		get y() {
			return properties.progressBar.y + properties.xp.size + 2
		},
		size: 35,
		get lineWidth() {
			return Math.floor(properties.xp.size / 20)
		},
	},
	progressBar: {
		get x() {
			return 625 - properties.progressBar.with / 2
		},
		get y() {
			return properties.image.height / 3 + 55 * 2 - properties.progressBar.height / 2
		},
		height: 50,
		with: 350,
		color: `#${Math.floor(Math.random()*16777215).toString(16)}`
	},
	pdpBot: {
		get x() {
			return properties.image.width - properties.pdpBot.size / 2 - 7
		},
		get y() {
			return properties.image.height - properties.pdpBot.size / 2 - 7
		},
		size: 50
	}
}

const commandExport: CommandSlash = {
	data: new SlashCommandBuilder()
	.setName("level")
	.setNameLocalizations({
			"en-US": "level",
			fr: "level"
		})
	.setDescription("Gives the level about a member or about you")
	.setDescriptionLocalizations({
			"en-US": "Gives the level about a member or about you",
			fr: "Affiche le niveau du membre"
		})
	.addUserOption(option =>
		option.setName("member")
		.setNameLocalizations({
					fr: "membre",
					"en-US": "member"
				})
		.setDescription("Member")
		.setDescriptionLocalizations({
					fr: "Membre",
					"en-US": "Member"
				})
		.setRequired(false)
	)
	.setNSFW(false),
	async execute(interaction, client, reply) {
		try {
			let member = interaction.guild?.members.cache.find((m) => m.id === (interaction.options.getUser("member") ? interaction.options.getUser("member") : interaction.member?.user)?.id);
			
			const image = createCanvas(properties.image.width, properties.image.height); // Create an image
			const ctx = image.getContext("2d"); // Initialize canvas
			const background = await loadImage(properties.image.background);
			ctx.drawImage(background, 0, 0, properties.image.width, properties.image.height); // Draw the background image
			
			// Drawn overlay
			ctx.fillStyle = properties.overlay.color || "#FFF"; // Make the text white
			ctx.fillRect(properties.overlay.x || 0, properties.overlay.y || 0, properties.overlay.width || 0, properties.overlay.height || 0); // Fill the circle blank
			
			// Username
			ctx.font = `${properties.username.size || 42}px "Protest Strike"`; // Change the text font
			ctx.fillStyle = "#FFF"; // Make the text white
			ctx.textAlign = "center"; // Position the text in the center
			ctx.lineWidth = 4;  //define the width of the stroke line
			ctx.fillText(member?.user.username.toUpperCase() as string, properties.username.x || 0, properties.username.y || 0); // Write the member's name
			ctx.strokeText(member?.user.username.toUpperCase() as string, properties.username.x || 0, properties.username.y || 0); // Write the member's name
			
			let level: DatabaseInterface["server"]["levels"]["user"] = await client.database.get(`/${interaction.guild?.id}/levels/${member?.user.id}`);
			if (level.level === undefined) level = {
				level: 1,
				xp: 0
			}
			// LEVEL Text
			ctx.font = `${properties.level.size || 42}px "Protest Strike"`; // Change the text font
			ctx.fillStyle = "#FFF"; // Make the text white
			ctx.textAlign = "start"; // Position the text in the center
			ctx.lineWidth = properties.level.lineWidth || 4;  //define the width of the stroke line
			ctx.fillText(`Level: ${level.level}`, properties.level.x || 0, properties.level.y || 0); // Writes the member level
			ctx.strokeText(`Level: ${level.level}`, properties.level.x || 0, properties.level.y || 0);
			
			// Progress bar
			ctx.fillRect(properties.progressBar.x || 0, properties.progressBar.y || 0, properties.progressBar.with || 0, properties.progressBar.height || 0); // Fill the circle blank
			ctx.fillStyle = properties.progressBar.color || "#00F"; // Make the text white
			ctx.fillRect(properties.progressBar.x || 0, properties.progressBar.y || 0, (level.xp / (level.level * 150) * properties.progressBar.with) || 0, properties.progressBar.height || 0); // Fill the circle blank
			
			// XP Text
			ctx.fillStyle ="#FFF"; // Make the text white
			ctx.font = `35px "Protest Strike"`; // Change the text font
			ctx.textAlign = "end"; // Position the text in the center
			ctx.lineWidth = properties.xp.lineWidth || 4;  //define the width of the stroke line
			ctx.fillText(`${level.xp}/${level.level * 150}`, properties.xp.x || 0, properties.xp.y || 0); // Writes the member level
			ctx.strokeText(`${level.xp}/${level.level * 150}`, properties.xp.x || 0, properties.xp.y || 0);
			
			// Put a margin with the overlay to the pdp bot
			ctx.beginPath();
			ctx.save(); // Save the image
			ctx.arc(properties.pdpBot.x || 0, properties.pdpBot.y || 0, properties.pdpBot.size / 2 + properties.overlay.margin / 1.25, 0, Math.PI * 2);
			ctx.clip();
			ctx.drawImage(background, 0, 0, properties.image.width, properties.image.height); // Draw the background image
			ctx.closePath();
			
			// Drawn bot logo
			ctx.beginPath(); // Create a new path
			const pdpbot = await loadImage(client.user?.avatarURL({ extension: "png" }) as string); // Load the bot's profile image
			ctx.arc(properties.pdpBot.x || 0, properties.pdpBot.y || 0, properties.pdpBot.size / 2, 0, Math.PI * 2); // Draw a circle
			ctx.clip(); // Cut the sheet so that you can only write in this circle
			ctx.drawImage(pdpbot, properties.pdpBot.x - properties.pdpBot.size / 2, properties.pdpBot.y - properties.pdpBot.size / 2 || 0, properties.pdpBot.size || 0, properties.pdpBot.size || 0); // Draw the bot's profile picture
			ctx.restore(); // Restore the sheet
			ctx.closePath(); // Close last path
			
			// Drawn the user profile picture
			ctx.beginPath(); // Create a new path
			ctx.arc(properties.pdp.background.x || 0, properties.pdp.background.y || 0, properties.pdp.background.size || 0, 0, Math.PI * 2); // Draw a circle
			ctx.save(); // Save the image
			ctx.clip(); // Cut the sheet so that you can only write in this circle
			ctx.fillRect(properties.pdp.background.x - properties.pdp.background.size || 0, properties.pdp.background.y - properties.pdp.background.size || 0, properties.pdp.background.size * 2 || 0, properties.pdp.background.size * 2 || 0); // Fill the circle blank
			ctx.restore(); // Restore the sheet
			ctx.closePath(); // Close last path
			
			ctx.beginPath(); // Create a new path
			const pdp = await loadImage(member?.user.avatar ? `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png?size=1024` : member?.user.defaultAvatarURL as string); // Load member image
			ctx.arc(properties.pdp.background.x || 0, properties.pdp.background.y || 0, properties.pdp.image.size || 0, 0, Math.PI * 2); // Draw a circle
			ctx.save(); // Save the image
			ctx.clip(); // Cut the sheet so that you can only write in this circle
			ctx.closePath(); // Close last path
			ctx.drawImage(pdp, properties.pdp.image.x || 0, properties.pdp.image.y || 0, properties.pdp.image.size * 2 || 0, properties.pdp.image.size * 2 || 0); // Draw the member's profile picture
			
			const attachment = new AttachmentBuilder(image.toBuffer(), {name: `${member?.user.tag.toLowerCase()}'s level image.png`, description: `Image made by ${client.user?.username}, ${client.user?.username} RedEye was made by Sleezzi`});
			reply({ files: [attachment] });
		} catch(err) { return err; }
	}
}

module.exports = commandExport;