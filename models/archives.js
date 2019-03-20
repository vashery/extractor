// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model
var ArchiveSchema = new Schema({
    filepath: {
        type: String,
        unique : true,
        required: "Filename is Required"
    },
    senttoextractor: Boolean,
    extracted: Boolean,
    workingon: Boolean,
    error: Boolean,
    errormessage: {
        type: String,
    },
    // `date` must be of type Date. The default value is the current date
    date: {
        type: Date,
        default: Date.now
    }
});

// This creates our model from the above schema, using mongoose's model method
var Archives = mongoose.model("archives", ArchiveSchema);

// Export the Example model
module.exports = Archives;