const unrar = require("@fknop/node-unrar");
const mongoose = require("mongoose");
const path = require("path");
const db = require("../models");

module.exports = function () {

    var promises = [];

    async function closecon() {

        await Promise.all(promises);
        exmong.mongoose.disconnect();

    };

    //mongoose.connect("mongodb://localhost/extractor", { useNewUrlParser: true });

    db.archives
    .find({ senttoextractor: true, extracted: false })
    .then(function (result) {

        for (let i = 0; i < result.length; i++) {

            let docid = result[i]._id;
            let fullpath = result[i].filepath;
            let folderpath = path.dirname(result[i].filepath);
            let currentunrar = unrar.extract(fullpath, { openMode: 1, dest: folderpath })
            .then(function () {

                console.log("extracted " + fullpath);
                return db.archives
                .updateOne({ _id: docid }, update = { extracted: true })
                .then()
                .catch((err) => {
                    console.log(err);
                });


            })
            .catch(function (err) {

                return db.archives
                .updateOne({ _id: docid }, update = { error: true, errormessage: err })
                .then()
                .catch((err) => {

                    console.log(err);

                });

            });

            promises.push(currentunrar);

        }
        //closecon();

    })
    .catch(function (err) {
        console.log(err);

    });

};
