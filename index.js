require("dotenv").config();
const React = require("react");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const path = require("path");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
var success = "";

const app = express();

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PW,
    },
});

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect(
    "mongodb+srv://" +
    process.env.BASE +
    ".hh5nv.mongodb.net/registeredDB?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    samniveshaId: String,
    fullname: {
        type: String,
        required: true
    },
    collegename: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        sparse: true
    },
    contactnumber: {
        type: String,
        required: true
    },
});

const User = new mongoose.model("User", userSchema);
app.get("/", function (req, res) {
    res.redirect('/home');
});


app.get("/:page", function (req, res) {
    const {
        page
    } = req.params
    res.render(`${page}`, {
        page
    });
});

// app.get("/event", function (req, res) {
//     res.render("event");
// });
// app.get("/event1", function (req, res) {
//     res.render("event1");
// });
// app.get("/event2", function (req, res) {
//     res.render("event2");
// });
// app.get("/event3", function (req, res) {
//     res.render("event3");
// });
// app.get("/event4", function (req, res) {
//     res.render("event4");
// });
// app.get("/event5", function (req, res) {
//     res.render("event5");
// });
// app.get("/event6", function (req, res) {
//     res.render("event6");
// });
// app.get("/event7", function (req, res) {
//     res.render("event7");
// });

// app.get("/schedule", function (req, res) {
//     res.render("schedule");
// });

// app.get("/workshops", function (req, res) {
//     res.render("workshops");
// });

// app.get("/contact", function (req, res) {
//     res.render("contact");
// });

// app.get("/guests", function (req, res) {
//     res.render("guests");
// });
// sponsors page
// app.get("/sponsors", function(req, res) {
//   res.render("sponsors.ejs");
// });

app.get("/campus-ambassador", function (req, res) {
    res.render("ca-prog");
});

// app.get("/register", function (req, res) {
//     res.render("register");
// });

generateSamniveshaId = async () => {
    var minm = 1000;
    var maxm = 9999;
    while (true) {
        const randomNumber = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
        const samniveshaId = randomNumber;
        const user = await User.findOne({
            samniveshaId: samniveshaId
        });
        if (!user) {
            return samniveshaId;
        }
    }
};

app.post("/register", async function (req, res) {
    const email = await User.findOne({
        email: req.body.email
    });
    if (!email) {
        const samniveshaId = await generateSamniveshaId();

        const newUser = new User({
            samniveshaId: samniveshaId,
            fullname: req.body.fullname,
            collegename: req.body.collegename,
            email: req.body.email,
            contactnumber: req.body.contactnumber,
        });

        var samId = samniveshaId;
        newUser.save(function (err) {
            if (err) {
                var content1 = "Failed";
                var content2 = "Registration Failed, try again.";
                res.render("success.ejs", {
                    heading: content1,
                    para: content2
                });
            } else {
                var mailOptions = {
                    from: process.env.EMAIL_ID,
                    to: req.body.email,
                    subject: "Samnivesha 2022",
                    text: "Dear " +
                        req.body.fullname +
                        ",\n\n" +
                        "Your Registration for Samnivesha'22 is successful.\n" +
                        "Your Samnivesha ID is SAM" +
                        samId +
                        "\n\n" +
                        "Your details are:"+"\n"+
                        "NAME:- "+
                        req.body.fullname+
                        "\n"+
                        "COLLEGE:- "+
                        req.body.collegename+
                        "\n"+
                        "EMAIL:- "+
                        req.body.email+
                        "\n"+
                        "MOBILE NO. :- "+
                        req.body.contactnumber+
                        "\n\n"+
                        "Please note that it is a unique ID. Do not share with others." +
                        "Use this ID to register for the events and workshops from https://samnivesha.iitp.ac.in/events\n\n" +
                        "For any query, please reply at ace@iitp.ac.in \n\n" +
                        "Thanks\n" +
                        "Team Samnivesha",
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        var content1 = "Failed";
                        var content2 =
                            "Registration Failed, try again. For further assistance, please contact Utkarsh- +91 6391 583 681";
                        res.render("success.ejs", {
                            heading: content1,
                            para: content2
                        });
                    } else {
                        var content1 = "SUCCESS!!";
                        var content2 =
                            "Congratulations! Your registration is successful and a mail containing your Samnivesha Id has been sent to your registered Email Id.";
                        res.render("success.ejs", {
                            heading: content1,
                            para: content2
                        });
                    }
                });
            }
        });
    } else {
        var content1 = "Already Registered";
        var content2 =
            "Email Id already Registered. Type 'Samnivesha21' in your email search box to search your Samnivesha ID if you have forgotten. For further assistance, please contact Utkarsh- +91 6391 583 681";
        res.render("success.ejs", {
            heading: content1,
            para: content2
        });
    }
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});