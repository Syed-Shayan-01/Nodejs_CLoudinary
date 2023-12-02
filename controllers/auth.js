const bcrypt = require('bcryptjs');
const { Auth } = require('../models/authSchema');
const { Secret } = require('../Secret/Key');
const jwt = require('jsonwebtoken')
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashPass = await bcrypt.hash(password, 12);
        const saveData = new Auth({
            username,
            email,
            password: hashPass,
        })
        const userCheck = await Auth.findOne({ email });
        if (userCheck) {
            return res.status(400).json({ error: 'User Already Exists' });
        }
        const response = await saveData.save();
        return res.status(201).send({ status: 201, message: response });
    } catch (error) {
        throw error;
    }
}


const findUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCheck = await Auth.findOne({ email });
        if (!userCheck) {
            return res.status(400).json({ error: 'User Not Exists' });
        }
        const comparePass = await bcrypt.compare(password, userCheck.password)
        if (!comparePass) {
            return res.status(403).send({ error: 'Password Incorrect' })
        }
        const token = jwt.sign({ _id: userCheck._id }, Secret)
        return res.status(200).send({ status: 200, userCheck, token, message: 'Success' })
    } catch (error) {
        throw error;
    }
}

const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const deleted = await Auth.findByIdAndUpdate({ _id: req.params.id }, { username, email });
        if (deleted) {
            return res.status(204).send({ status: 204, message: "USER DELETED SUCCESSFULY" })
        }
    } catch (err) {
        return res.status(400).send({ status: 400, message: "USER DOES'NT DELETE" })
    }
}


const deleteUser = async (req, res) => {
    try {
        const { username } = req.body;
        const deleted = await Auth.deleteOne({ _id: req.params.id });
        if (deleted) {
            return res.status(204).send({ status: 204, message: "USER DELETED SUCCESSFULY" })
        }
    } catch (err) {
        return res.status(400).send({ status: 400, message: "USER DOES'NT DELETE" })
    }
}
module.exports = { registerUser, findUser, updateUser, deleteUser };

