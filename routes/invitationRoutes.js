const express = require("express");
const router = express.Router();
const Invitation = require("../models/Invitation");

// Configure express to handle larger payloads
router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ limit: "50mb", extended: true }));

// Create new invitation
router.post("/", async (req, res) => {
  try {
    console.log(
      "Received invitation request with template:",
      req.body.templateId
    );

    // Create new invitation document
    const invitation = new Invitation({
      templateId: req.body.templateId,
      textFields: req.body.textFields,
      updatedImageData: req.body.updatedImageData,
    });

    // Save to database
    const savedInvitation = await invitation.save();
    console.log("Invitation saved with ID:", savedInvitation._id);

    // Return success with ID
    res.status(201).json({
      _id: savedInvitation._id,
      message: "Invitation created successfully",
    });
  } catch (err) {
    console.error("Error saving invitation:", err);
    res.status(500).json({ error: "Failed to save invitation" });
  }
});

// Get invitation by ID
router.get("/:id", async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id);
    if (!invitation) {
      return res.status(404).json({ error: "Invitation not found" });
    }
    res.json(invitation);
  } catch (err) {
    console.error("Error fetching invitation:", err);
    res.status(500).json({ error: "Failed to fetch invitation" });
  }
});

module.exports = router;
