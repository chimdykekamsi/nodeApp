const asyncHandler = require("express-async-handler");
const Contact = require("../modules/contactModule");

// @desc Get all contacts
// @route GET api/contacts/
// @access private
const getContacts = asyncHandler(
    async (req,res,next) => {
        const contacts = await Contact.find({user_id:req.user.id});
        res.status(200).json(contacts);
    }
)

// @desc Create a new contact
// @route POST api/contacts/
// @access private
const createContact = asyncHandler(
    async(req,res,next) => {
        const {name, email, phone} = req.body;
        if (!name || !email || !phone) {
            res.status(400);
            throw new Error("All fields are required");
        }

        const contact = await Contact.create({
            name,email,phone,user_id:req.user.id
        })

        return res.status(201)
            .json({
                message: 'Contact Created',
                contact
            })
})

// @desc Get individual contact
// @route GET api/contacts/:id
// @access private
const getContact = asyncHandler(
    async(req,res,next) => {
        const id = req.params.id;
        const contact = await Contact.findById(id); 

        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }

        return res.status(200)
            .json({
                contact
            })
})

// @desc Update individual contact
// @route PUT api/contacts/:id
// @access private
const updateContact = asyncHandler(
    async(req,res,next) => {
        // find contact check if exists then check authorization
        const id = req.params.id;
        
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true
            }
        )

        return res.status(200)
            .json({
                message: `Contact Updated`,
                updatedContact
            })
})

// @desc Delete individual contact
// @route DELETE api/contacts/:id
// @access private
const deleteContact = asyncHandler(
    async (req,res,next) => {
        const id = req.params.id;

        const contact = await Contact.findById(id);

        
        if (!contact) {
            res.status(404);
            throw new Error("Contact not found");
        }
        await Contact.deleteOne({_id : id});


        return res.status(200)
            .json({
                message: `Deleted Contact ${id}`
            })
})


module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}