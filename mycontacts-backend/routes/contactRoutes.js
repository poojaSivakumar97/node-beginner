const express = require("express");
const {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);
router.get("/", getContacts);
router.get("/:id", getContact);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
module.exports = router;
