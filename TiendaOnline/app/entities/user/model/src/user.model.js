const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");
const crypto = require('crypto');

const mongoose = DbService.get();

const userSchema = new mongoose.Schema({
    
    user_email:{
        type: String,
        required: true,
        unique: true
    },

    user_password:{
        type: String,
        required:true
    },

    user_nombre:{
        type: String,
        required:true
        
    },

    user_apellidos:{
        type: String,
        requiered: true
    },

    user_telf:{
        type: String,
        required:true
    },


    /*user_entrenador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'entrenador',
        required:false
    }*/



}, {
    timestamps: true,

});

userSchema.statics.UserExistsByEmail = async (email)=>{

        let userExists = await tmpModel.exists({user_email: email});
        
        if(userExists){
            throw new User.Exceptions.UserAlreadyExistsException({
                error_type: "ALREADY_EXISTS",
                error_message: "User already exists"
            })
        }
},

userSchema.statics.EncryptMD5 = async (passwordUnencrypted)=>{

    const hash = crypto.createHash('md5');
    hash.update(passwordUnencrypted);
    const encryptedValue = hash.digest('hex');
    return encryptedValue;

}

const tmpModel = mongoose.model("User", userSchema);
const User = new KaindaModel(tmpModel);
module.exports = User;
