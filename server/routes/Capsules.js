const express = require('express');
const router = express.Router()
const Capsule = require('../models/Capsule');

router.post('/', async(req, res) => {
    try {
        const newCapsule = new Capsule({
            title : req.body.title,
            message : req.body.message,
            unlockDate : req.body.unlockDate,
        });
        const savedCapsule = await newCapsule.save();
        res.status(201).json(savedCapsule);
    }
    catch (err) {
        res.status(500).json({error : err.message});
    }
});

router.get('/', async (req, res) => {
  try {
    const capsules = await Capsule.find().sort({ createdAt: -1 });

    const secureCapsules = capsules.map(capsule => {
      const now = new Date();
      const unlockTime = new Date(capsule.unlockDate);

      if (now >= unlockTime) {
        return capsule;
      } 
      
      return {
        _id: capsule._id,
        title: capsule.title,
        unlockDate: capsule.unlockDate,
        createdAt: capsule.createdAt,
        message: "🔒 THIS MESSAGE IS LOCKED UNTIL " + unlockTime.toLocaleDateString()
      };
    });

    res.json(secureCapsules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;