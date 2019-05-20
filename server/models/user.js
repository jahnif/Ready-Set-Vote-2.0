const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: val => `${val.value} is not a valid email.`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    verified: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()

    delete userObject.password

    return userObject
    
};

UserSchema.methods.generateAuthToken = async function() {
    let user = this
    let token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: '2 weeks'}).toString()
    return token
};

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email.toLowerCase()})
    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
};

// Hash plaintext password before saving; ensure emails are truly unique
UserSchema.pre('save', async function (next) {
    const user = this;
    user.email = user.email.toLowerCase()
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    } 
    next()
});

UserSchema.plugin(mongoosePaginate)

let User = mongoose.model('User', UserSchema);

module.exports = User