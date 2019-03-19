// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model
var FolderPathSchema = new Schema({
    path: {
        type: String,
        required: "Path is Required"
    },
    enabled: Boolean,
    // `date` must be of type Date. The default value is the current date
    date: {
        type: Date,
        default: Date.now
    }
});

// This creates our model from the above schema, using mongoose's model method
var Folderpaths = mongoose.model("Folderpaths", FolderPathSchema);

// Export the Example model
module.exports = Folderpaths;