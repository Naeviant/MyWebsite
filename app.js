var express = require("express"),
    config = require("./config"),
    projects = require("./projects.json"),
    bodyParser = require("body-parser"),
    app = express(),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    swig = require("swig");

app.engine("html", swig.renderFile);
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/static"));
app.use(cookieParser());
app.use(session({secret: "anything", resave: false, saveUninitialized: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view cache", false);
swig.setDefaults({cache: false});

app.locals = {
    
};

app.get("/", function(req, res) {
    res.render("index");
});

app.get("*", function(req, res, next) {
    res.redirect("/");
});

app.post("/project/", function(req, res, next) {
    var project = projects.filter(x => x.title == req.body.project );
    if (project[0]) {
        res.render("project_partial", project[0]);
    }
    else {
        res.sendStatus(404);
    }
});

var server = app.listen(config.app.port, function() {
    console.log("Listening on Port " + config.app.port);
});