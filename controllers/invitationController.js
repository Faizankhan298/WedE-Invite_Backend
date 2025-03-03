import Invitation from "../models/Invitation.js";

// Create a new invitation
export const createInvitation = async (req, res) => {
  try {
    console.log("Creating invitation with template ID:", req.body.templateId);

    // Make sure updatedImageData has a default value if not provided
    if (!req.body.updatedImageData) {
      // Option 1: Use the original template image data if available
      if (req.body.templateId) {
        const template = await Template.findById(req.body.templateId);
        if (template && template.imageData) {
          req.body.updatedImageData = template.imageData;
        } else {
          // Option 2: Set a default empty string or placeholder
          req.body.updatedImageData = ""; // or some placeholder value that meets your validation requirements
        }
      } else {
        req.body.updatedImageData = ""; // Default empty string
      }
    }

    // Continue with creating the invitation
    const invitation = new Invitation(req.body);
    await invitation.save();
    res.status(201).json(invitation);
  } catch (error) {
    console.error("Error creating invitation:", error);
    res
      .status(400)
      .json({
        message: "Failed to save invitation. Please try again.",
        error: error.message,
      });
  }
};

// Get invitation by ID
export const getInvitationById = async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id);
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }
    res.status(200).json(invitation);
  } catch (error) {
    console.error("Error fetching invitation:", error);
    res
      .status(500)
      .json({ message: "Error fetching invitation", error: error.message });
  }
};
