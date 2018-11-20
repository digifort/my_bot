const Discord = require("discord.js")
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    //client.user.setActivity("with JavaScript")
    client.user.setActivity("YouTube",{type:"WATCHING"})

    client.guilds.forEach((guild) => {
        console.log(guild.name)

        guild.channels.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
        })
    } )

    let generalChannel = client.channels.get("XXXX")
    const attachment = new Discord.Attachment("https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png") 
    generalChannel.send(attachment)
})

client.on('message', (receivedMessage) => {
    if(receivedMessage.author == client.user) {
        return
    }

    // receivedMessage.channel.send("Message Received " + receivedMessage.author.toString() + " : " + receivedMessage.content)

    // receivedMessage.react("🎃")
    // // receivedMessage.guild.emojis.forEach(customEmoji => {
    // //     console.log(`${customEmoji.name} ${customEmoji.id}`)
    // //     receivedMessage.react(customEmoji)
    // // })
    // let customEmoji = receivedMessage.guild.emojis.get("XXXX")
    // receivedMessage.react(customEmoji)

    if(receivedMessage.content.startsWith("!")){
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage){
    let fullCommand = receivedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    if (primaryCommand == "help"){
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply"){
        multiplyCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("Unknown command. Try `!help` or `!multiply`")
    }
}

function helpCommand(arguments, receivedMessage){
    if (arguments.length == 0){
        receivedMessage.channel.send("I'm not sure what you help with, Try '!help [topic]'")
    }
    else{
        receivedMessage.channel.send("It looks like you need help with " + arguments)
    }
}

function multiplyCommand(arguments, receivedMessage){
    if(arguments.length < 2) {
            receivedMessage.channel.send("Not enough arguments. Try `!multiply 2 10`")
            return
    }
    let product = 1
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " is " + product.toString() )

}

client.login("XXXX")