const mongoose = require("mongoose");
const db = require("../models");
const readdirp = require('readdirp');


module.exports = function () {

    let promises = [];

    async function closecon() {

        await Promise.all(promises);
        foldermong.mongoose.disconnect();

    };

    //mongoose.connect("mongodb://localhost/extractor", { useNewUrlParser: true });

    db.folderpaths
    .find({})
    .then(function (results) {

        for (let i = 0; i < results.length; i++) {

            let curpath = results[i].path;
            let settings = {
                root: curpath,
                entryType: 'files',
                fileFilter: '*.rar',
                depth: 100,
            };

            readdirp(settings,
                function (fileInfo) {

                    let curentasync = db.archives.create({
                        filepath: fileInfo.fullPath,
                        senttoextractor: false,
                        workingon: false,
                        extracted: false,
                        error: false,
                    })
                    .then()
                    .catch(function (err) {

                        //console.log(err);

                    });

                    promises.push(curentasync);

                },


                function (err, res) {

                    if (err) {
                        throw err;
                    }
                    //closecon();

                });

        }

    })
    .catch(function (err) {

        console.log(err);

    });

};