const express = require("express");
const Prediction = require("../models/Prediction");
const authMiddleware = require("../middleware/auth"); // Protect VIP predictions

const router = express.Router();

/** ✅ Get All Free Predictions */
router.get("/free", async (req, res) => {
    try {
        const predictions = await Prediction.find({ isVIP: false }).sort({ date: 1 });
        res.json(predictions);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

/** 🔒 Get VIP Predictions (Requires Authentication) */
router.get("/vip", authMiddleware, async (req, res) => {
    try {
        const predictions = await Prediction.find({ isVIP: true }).sort({ date: 1 });
        res.json(predictions);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

/** 📝 Add a New Prediction (Admin Only - For Testing) */
router.post("/add", async (req, res) => {
    const { match, league, prediction, odds, date, isVIP } = req.body;

    try {
        const newPrediction = new Prediction({
            match,
            league,
            prediction,
            odds,
            date,
            isVIP,
        });

        await newPrediction.save();
        res.json({ msg: "Prediction added successfully!" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
