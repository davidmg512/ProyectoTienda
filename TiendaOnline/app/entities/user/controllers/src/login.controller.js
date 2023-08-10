const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const admin = require('firebase-admin');
//const functions = require('firebase-functions');

/**
 * login new user
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */


/*async function loginUser(req, res){

    try{
        const {user_email, user_password} = req.body;

        const userRecord = await admin.auth().getUserByEmail(user_email);
        
        await admin.auth().signInWithEmailAndPassword(user_email, user_password);

        return res.status(201).json({message: "Inicio de sesión con éxito"});
    }catch (error) {
        
        console.error('Error al iniciar sesión', error);
        return res.status(500).json(error.message);
    }
}*/

async function registerUser(req, res) {

    const User = ModelsService.Models.User;
    let transaction = await User.transaction(DbService.get());


    try {
        const { user_email, user_password } = req.body;

        const numtelfSecure = req.body.user_telf;

        const numValid = await User.subModel.ValidatePhoneNumber(numtelfSecure);


        const userRecord = await admin.auth().createUser({
            email: user_email,
            password: user_password
        });

        const noEncryptPassword = req.body.user_password;

        req.body.user_password = await User.subModel.EncryptMD5(noEncryptPassword);

        const user = await User.createOne(req.body, {transaction});
        await transaction.commit();
        

        return res.status(201).json({message: "todo bien"});

    } catch (error) {
        console.error('Error al registrar el usuario', error);
        return res.status(500).json(error.message);
    }


}

/*async function registerUser(req, res)
{
    const User = ModelsService.Models.User;
    let transaction = await User.transaction(DbService.get());

    try{

        const user_email = req.body.user_email;

        await User.subModel.UserExistsByEmail(user_email);

        const user = await User.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(user.toJSON());

    }catch(error){
        console.log(error);
        LogService.ErrorLogger.error(error); 
    
        await transaction.rollback();
        
        ExceptionService.handle(error, res);
    }


}
*/

module.exports = {
    loginUser,
    registerUser
};