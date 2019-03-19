const mongoose = require("mongoose");
const db = require("../models");

module.exports = function () {

    var promises = [];

    async function closecon() {

        await Promise.all(promises);
        sendmong.mongoose.disconnect();

    };

    // Connect to the Mongo DB
    //mongoose.connect("mongodb://localhost/extractor", { useNewUrlParser: true });


    db.archives
    .find({})
    .then((results) => {
        for (var i = 0; i < results.length; i++) {

            var curid = results[i]._id;
            let currentupdate = db.archives
            .updateOne({ _id: curid }, update = { senttoextractor: true })
            .then();
            promises.push(currentupdate);

        }
        //closecon();

    })
    .catch((err) => {

        console.log(err)

    });

};