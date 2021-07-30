const express = require("express");
const router = express.Router();
const path = require("path");
const admin = require("firebase-admin");
var serviceAccount = require("../omage-accounts-firebase-adminsdk-1kywj-ad3e834032.json");
const { Router } = require("express");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://omage-accounts-default-rtdb.firebaseio.com/",
});

//Check User

function checkUser(req, res, next) {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      next();
    })
    .catch((error) => {
      res.redirect("/login");
    });
}

//Main Routes

router.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});
router.get("/", (req, res) => res.render("../views/home.ejs"));
router.get("/login", (req, res) => res.render("../views/login.ejs"));
router.get("/download_white_paper", (req, res) => {
  var file = path.join(
    __dirname,
    "..",
    "whitepaper-pdf",
    "OmageWhitepaper.pdf"
  );
  res.download(file, function (err) {
    if (err) {
      console.log("Error");
      console.log(err);
    }
  });
});

router.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();
  const expiresIn = 60 * 60 * 1000;
  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});
router.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

//Buy Token route

router.get("/buy-token", checkUser, (req, res) => {
  res.render("../views/buytoken.ejs");
});
module.exports = router;
