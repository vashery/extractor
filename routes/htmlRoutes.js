var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    res.redirect('/archives')
  });

  app.get("/archives", function(req, res) {
    res.render("archives")
  });

  app.get("/folders", function(req, res) {
    res.render("folders")
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("archives");
  });
};
