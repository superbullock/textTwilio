/**
 * Created by dan on 3/3/15.
 */
var express     = require("express"),
    secret      = require("./scripts/secrets.js"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
//database      = require("mongodbService")
    client      = require("twilio")(secret.accountSid, secret.authToken);


/*  Mongoose logic  */
mongoose.connect('mongodb://localhost/test')

var User = mongoose.model('User', {firstName: String, phone: String, groups: Array, lastName: String, email: String, uid: String});

var Contact = mongoose.model("Contact", {name: String, phone: String, groups: Array, uid: String});

var Message = mongoose.model("Message", {body: String, date: Number, uid: String})

app = express();

app.use(express.static(__dirname));

app.use(bodyParser.json());


//Messages

app.get("/messages/:id", function(req, res) {
  Message.find({uid: req.params.id}, function(err, data) {
    res.send(data)
  })
})

app.post("/messages", function (req, res) {
  if (!req.body) return res.sendStatus(400)
  req.body.from = secret.myNum;
  client.messages.create(req.body, function (err, message) {
    if (err) console.log(err + " " + message)
    res.send(message)
  })
})

app.post("/messageHistory/:uid", function (req,res) {
  req.body.to = null;
  req.body.date = Date.now();
  req.body.uid = req.params.uid;
  newMessage = new Message(req.body)
  newMessage.save(function(err) {
    if (err) res.send(err)
    res.send("Saved Message");
  })

})

//User

app.get("/user/:id", function(req, res) {
  User.find({ uid: req.params.id}, function(err, data) {
    console.log(data);
    res.send(data);
  })
})

app.post("/user", function (req, res) {
  var newUser = new User (req.body)
  newUser.save(function(err){
    if (err) res.send(err)
    res.send("successfully added user")
  })

})


//Contacts

app.get("/contacts/:uid", function (req, res) {
  Contact.find({ uid: req.params.uid}, function(err, contacts) {
    if (err) return console.log(err)
    res.send(contacts)
  })
})

app.post('/contacts', function(req,res) {
  var newContact = new Contact(req.body)
  newContact.save(function (err) {
    if (err) res.send(err)
    res.send("Successfully added contact")
  })
})

app.delete("/contacts/:id", function(req, res) {
  Contact.find({_id: req.params.id}).remove().exec()
  res.send("Deleted Contact")
})



app.listen(8090, function (err) {
  if (err) return cosole.log(err);
  console.log("Serving up on port 8090")
})