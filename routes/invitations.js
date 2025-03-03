import express from "express";
import * as invitationController from "../controllers/invitationController.js";

const router = express.Router();

// POST /api/invitations - Create a new invitation
router.post("/", invitationController.createInvitation);

// GET /api/invitations/:id - Get invitation by ID
router.get("/:id", invitationController.getInvitationById);

export default router;
