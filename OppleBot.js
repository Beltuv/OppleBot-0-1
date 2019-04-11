const Discord = require("discord.js");
const bot = new Discord.Client();

const Token = process.env.token;

let StockMAX, Stock, StockGoodBadSeperation;
let IsCEO;
let gameTimeout, OnGame, gameChoice, roof;
let CEOrole, FounderRole;
let price, priceMAX, PriceMIN, currentObject;

function pickStock() {
  StockMAX = 20000;
  StockMIN = 900;
  StockGoodBadSeperation = 2000
  Stock = Math.floor((Math.random() * StockMAX) + StockMIN);
}

function pickSales() {
  SalesMAX = 400000;
  SalesMIN = 1000;
  Sales = Math.floor((Math.random() * SalesMAX) + SalesMIN);
}

function pickPrice() {
  priceMAX = 30
  priceMIN = 3
  price = Math.floor((Math.random() * priceMAX) + priceMIN)
}

//Prices
    priceArray = []
    priceObjects = []
  //Prices-END

bot.on('ready', () => {
  bot.user.setActivity("Sale Checker");
  console.log("Opple Bot is online!")
  pickStock()
  pickSales()
  console.log(Stock);
  console.log("Seperation:" + StockGoodBadSeperation)
  gamesArray = ['Sale Checker','Stock Checker','with Beltuv','Solitaire'] //Edit the rarity and values if you wants to change it.
  gameTimeout = 180 //Seconds
  OnGame = 0; //0 is the first game
  
  roof = 100
  walls = ['46','92','100','100']
  //ActivityAdvanced
  setInterval(function() {
    gameChoice = Math.floor(Math.random() * roof) 
    if (gameChoice <= walls[0]) {
      bot.user.setActivity(gamesArray[0]);
    } else if (gameChoice > walls[0] && gameChoice <= walls[1]) {
      bot.user.setActivity(gamesArray[1]);
    } else if (gameChoice > walls[1] && gameChoice < walls[2]) {
      bot.user.setActivity(gamesArray[2]);
    } else {
      bot.user.setActivity(walls[3])
    }
    console.log(gameChoice)
  }, gameTimeout * 1000);

  //ActivityAdvanced-END
  CEOrole = "Chief Executive Officer"
  FounderRole = "Founder"
  pickPrice()
});

bot.on('message', message => {
  if (message.author.bot) return;
  args = message.content.split(/ +/);
  var m = message;
  let CEOrole = message.guild.roles.find("name", "CEO")

  //Hi and Bye
  UserGreetings = ['hello', 'Hello', 'HELLO', '!hello','!Hello','!HELLO','hi','Hi','HI','!hi','!Hi','!HI',
  'hey','Hey','HEY','!hey','!Hey','!HEY','im back','Im back',"I'm back",'hello!','Hello!','HELLO!','Hey!',
  'hey!','HEY!','hi!','Hi!','HI!']
  User_Leaving_Messages = ['bye','Bye','BYE','!bye','!Bye','!BYE','See ya','see ya','see ya!','See ya!',
  'See you','see you','see you!','See you!','gtg','Gtg','GTG','bye!','Bye!','BYE!','gtg!','Gtg!','GTG!']
  
  for (var i = 0; i < UserGreetings.length; i++) {
    if (m.content.startsWith(UserGreetings[i])) {
      message.channel.send("Hello, " + message.member.displayName + "!")
    }
  }  
  for (var i = 0; i < User_Leaving_Messages.length; i++) {
    if (m.content.startsWith(User_Leaving_Messages[i])) {
      message.channel.send("Goodbye, " + message.member.displayName + "!")
    }
  }
  //Hi and Bye-END
  //Moto Moto and Oregano
  motomotoNames = ['moto moto','Moto Moto','MOTO MOTO','motomoto','MotoMoto','MOTOMOTO','MoTo MoTo']
    for (var i = 0; i < motomotoNames.length; i++){
      if (m.content == motomotoNames[i]) {
        let bicon = bot.user.displayAvatarURL;
        let motoEmbed = new Discord.RichEmbed()
        .setDescription("Kool Bot's Singing")
        .setColor('#15f153')
        .setThumbnail(bicon)
        .addField("Big and Chunky - Moto Moto", "I like them big, I like them chunky \n (chunky) \n I like them big, I like them plumpy \n (Plumpy) \n I like them round, with something, something \n (Something) \n They like my sound, they think I'm funky \n (Funky)")

        message.channel.send(motoEmbed)
      }
    }  
  OreganoArray = ['Oregano','oregano','OREGANO','OrEgAnO']
  for (var i = 0; i < OreganoArray.length; i++) {
    if (m.content.startsWith(OreganoArray[i])) {
      message.channel.send("...is god!")
    }
  }
  //Moto Moto and Oregano-END
  //Coffee
  
  //Coffee-END
  //Stock
  let StockEmbedGood = new Discord.RichEmbed()
  .setTitle("Opple Inc. Stock and Sales")
  .setDescription("What is today's stock and Sales?")
  .setColor('#14e518')
  .attachFiles(['./images/checkmark.jpg'])
  .setThumbnail('attachment://checkmark.jpg')
  .addField("Stock", Stock+' boxes.')
  .addField("Sales", "$"+Sales+" each day.")
  .setFooter('Good job! Keep working to improve the sales and profits!')

  let  StockEmbedBad = new Discord.RichEmbed()
  .setTitle("Opple Inc. Stock and Sales")
  .setDescription("What is today's stock and Sales?")
  .setColor('#e21c12')
  .attachFiles(['./images/redx.jpg'])
  .setThumbnail('attachment://redx.jpg')
  .addField("Stock", Stock+' boxes.')
  .addField("Sales", "$"+Sales+" each day.")
  .setFooter("HORRIBLE! Get in contact with the manufacturers right now to get this sorted out! We need more stock! ")

  StockArray = ['!stocks','!Stocks','!STOCKS','!stock','!Stock','!STOCK','stock','Stock','STOCK','!checkstocks','!checkstock','checkstock','checkstocks']
  for (var i = 0; i < StockArray.length; i++) {
    if (m.content.startsWith(StockArray[i])) {
      if (Stock >= StockGoodBadSeperation) {
        message.channel.send(StockEmbedGood);
      } else {
        message.channel.send(StockEmbedBad)
      }
    }
  }

  if (message.content.startsWith('?change')) {
    if (message.member.roles.find(r => r.name === "Chief Executive Officer")){
      if (args[1] == 'sales') {
       if (args[2]) {
        Sales = args[2]
        message.delete()
       } else {
         pickSales()
         message.delete
       }
      }
      
      if (args[1] == 'stock') {
        if (args[2]) {
          Stock = args[2]
          message.delete()
        } else {
          pickStock()
          message.delete()
        }
      
      }

      if (!args[1]) {
        message.delete()
      }
      if (args[1] != 'stock' || args[1] != 'sales') {
        message.delete()
      }
    } else {
      message.channel.send("You do not have permission for this command.")
    }
  }
  //Stock-END
  //Say
  if (message.content.startsWith('??say')) {
    if (message.member.roles.find(r => r.name === "Chief Executive Officer") || message.member.roles.find(r => r.name == FounderRole)){
      message.channel.send(message.content.replace('??say ',''))
      message.delete()
    } else {
      message.channel.send("You do not have permission for this command.")
    }
  }
  //Say-END
  //DESC-Opple
  OppleArray = ['Opple','opple','OPPLE','OpPlE','Opple Inc.','OppleInc.','oppleinc.','Opple Inc','OppleInc','oppleinc']

  let OppleEmbed = new Discord.RichEmbed()
  .setThumbnail(message.guild.iconURL)
  .addField("About Opple Inc.", "Opple Inc. is a business that designs and sells toys in everyone's interest each day. We take any sort of requests and we make it happen. With a partnership with Toys R Us, Hasbro, Walmart, and sometimes Costco, we can get the toys out to the public within 24 hours of the first design. This company is always welcoming new staff members, invite your friends! Also, if you want to chat with people outside of Opple Inc. make sure to join Kool Kids Klub. Work hard and you can become near the top of the company and maybe guarantee your ideas get on the market!")

  for (var i = 0; i < OppleArray.length; i++) {
    if (m.content.startsWith(OppleArray[i])) {
      message.channel.send(OppleEmbed)
    }
  }
  //DESC-Opple--END
  //Prices
  let PriceEmbed = new Discord.RichEmbed()
  .setColor('#DAA520')
  .setTitle('Price Checker')
  .addField("Price", args[1] + ' will cost $' + price + ' to produce.')
  .setFooter('*Opple Bot is not good at using Price Checker so he might find many different prices because he was never trained. One thing is for sure, Opple Bot always gets the first price correct. Trust Opple Bots first price on a product. Soon, Opple Bot will learn how to use Price Checker properly.*')


  if (message.content.startsWith("price")) {
    if (args[1]) {
      message.channel.send(PriceEmbed)
      pickPrice()
    } else {
      message.channel.send("Error: Missing Arguments.")
    }  
  }
  //Prices-END
 
});

bot.login(Token);
