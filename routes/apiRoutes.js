var db = require("../models");
const extractor = require("../commands/extractor.js");
const folderscan = require("../commands/folderscan.js");
const sender = require("../commands/sender.js");

module.exports = function (app) {


    app.get("/api/folders", function (req, res) {
        db.folderpaths
        .find({})
        .then(function (dbresult) {
            res.json(dbresult);
        })
        .catch((err) => {
            console.log(err);
        });
    });

    app.get("/api/archives", function (req, res) {
        db.archives
        .find({})
        .then(function (dbresult) {
            res.json(dbresult);
        })
        .catch((err) => {
            console.log(err);
        });
    });

    app.get("/api/scan", function (req, res) {
        folderscan();
        res.json({ message: "Folder Scan Started" });
    });

    app.get("/api/send", function (req, res) {
        sender();
        res.json({ message: "Sender Started" });
    });

    app.get("/api/extract", function (req, res) {
        extractor();
        res.json({ message: "Extractor Started" });
    });

    app.post("/api/folders", function (req, res) {
        db.folderpaths.create(
            req.body
        )
        .then((dbresult) => {
            res.json(dbresult);
        })
        .catch((err) => {
            console.log(err);
        });
    });

    app.post("/api/archives", function (req, res) {
        db.archives
        .create({
            filepath: req.body.filepath
        })
        .then((dbresult) => {
            res.json(dbresult);
        })
        .catch((err) => {
            console.log(err);
        });
    });

    app.put("/api/folders/:id", function (req, res) {
        db.folderpaths
        .updateOne({ _id: req.params.id }, update = req.body)
        .then((dbresult) => {
            res.json(dbresult);
        })
        .catch((err) => {
            console.log(err);
        });
    });

    app.put("/api/archives/:id", function (req, res) {
        db.archives
        .updateOne({
                _id:req.params.id
            },
            update = req.body)
        .then((dbresult) => {
            res.json(dbresult);
        })
        .catch((err) => {
            console.log(err);
        });
    });

    app.delete("/api/folders/:id", function (req, res) {
        db.folderpaths
        .deleteOne({_id: req.params.id})
        .then((dbresult) => {
            res.json(dbresult)
        })
        .catch((err) => {
            console.log(err)
        })

    });

    app.delete("/api/archives/:id", function (req, res) {
        db.archives
        .deleteOne({_id: req.params.id})
        .then((dbresult) => {
            res.json(dbresult)
        })
        .catch((err) => {
            console.log(err)
        })
    });

}
;
