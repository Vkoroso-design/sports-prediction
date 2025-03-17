const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
    match: { type: String, required: true },
    league: { type: String, required: true },
    prediction: { type: String, required: true },
    odds: { type: Number, required: true },
    date: { type: Date, required: true },
    isVIP: { type: Boolean, default: false }, // Free (false) or VIP (true)
});

module.exports = mongoose.model("Prediction", PredictionSchema);
