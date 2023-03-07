const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// @desc Get all contacts
//@route GET/api/contacts
// @access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});
/**
 * @description get one contact
 * @route GET/api/contacts/:id
 * @access private
 */
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`contact not found`);
  }
  res.status(200).json(contact);
});
// @desc Create a new  contact
//@route POST/api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.send(201).json(contact);
});
/**
 * @desc Update a contact
 * @route PUT/api/contacts/:id
 * @access private
 */
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.send(404);
    throw new Error(`contact not found`);
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(`user don't have permission `);
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});
/**
 * @desc Delete a contact
 * @route DELETE/api/contacts/:id
 * @access private
 */

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.send(404);
    throw new Error(`contact not found`);
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(`user don't have permission to delete `);
  }
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedContact);
});
module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
