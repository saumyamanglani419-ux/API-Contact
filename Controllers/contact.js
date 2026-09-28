import { Contact } from "../Models/Contact.js";

// get all contact
export const getAllContact = async (req, res) => {
  const userContact = await Contact.find();

  if (!userContact)
    return res.json({ message: "No Contact exists", success: false });

  res.json({ message: "All Contact Fetched", userContact });
};

// create new contact
export const newContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  if (name == "" || email == "" || phone == "" || type == "")
    return res.json({ message: "All fields are required", success: false });

  let saveContact = await Contact.create({
    name,
    email,
    phone,
    type,
    user: req.user._id
  });

  res.json({
    message: "Contact saved successfully",
    saveContact,
    success: true,
  });
};

// get contact by id
export const getContactbyId = async (req, res) => {
  const id = req.params.id;

  const userContact = await Contact.findById(id);

  if (!userContact)
    return res.json({ message: "No Contact found", success: false });

  res.json({ message: "Contact fetched", userContact, success: true });
};

//update contact by id
export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;

  let updatedContact = await Contact.findByIdAndUpdate(
    id,
    { name, email, phone, type },
    { new: true },
  );

  if (!updatedContact)
    return res.json({ message: "No contact exists", success: false });

  res.json({
    message: "Contact updated successfully",
    updatedContact,
    success: true,
  });
};

//delete contact by id
export const deleteContactById = async (req, res) => {
  const id = req.params.id;

  let deletedContact = await Contact.findByIdAndDelete(id);

  if (!deletedContact)
    return res.json({ message: "No contact exists", success: false });

  res.json({
    message: "Contact deleted successfully",
    deletedContact,
    success: true,
  });
};

// export const var_name = async (req, res) => {};

// get contact by user id 
export const getContactbyUserId = async (req, res) => {
  const id = req.params.id;

  const userContact = await Contact.find({user:id});

  if (!userContact)
    return res.json({ message: "No Contact found", success: false });

  res.json({ message: "User specific Contact fetched", userContact, success: true });
};