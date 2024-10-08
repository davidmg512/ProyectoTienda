const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const admin = require('firebase-admin');
const mongoose = require('mongoose');
//const functions = require('firebase-functions');

/**
 * login new user
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */


async function loginUser(req, res){

    try{
        const {user_email, user_password} = req.body;

        const userRecord = await admin.auth().getUserByEmail(user_email);
        
        await admin.auth().signInWithEmailAndPassword(user_email, user_password);

        return res.status(201).json({message: "Inicio de sesión con éxito"});
    }catch (error) {
        
        console.error('Error al iniciar sesión', error);
        return res.status(500).json(error.message);
    }
}

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



        const uid = userRecord.uid;
        req.body.user_id = uid;

        const userRol = 'nada';
        req.body.user_rol = userRol;

        const user = await User.createOne(req.body, {transaction});
        await transaction.commit();
        

        return res.status(201).json({message: "todo bien"});

    } catch (error) {
        console.error('Error al registrar el usuario', error);
        return res.status(500).json(error.message);
    }


}


async function loginUserGoogle(req, res) {

    const User = ModelsService.Models.User;
    let transaction = await User.transaction(DbService.get());


    try {

        const userId = req.decodedTokenId;
        const objectId = userId;
        const userEmail = req.decodedTokenEmail;
        const dataToCreate = {
            
            user_email: userEmail,
            user_nombre: 'Nombre/Name',
            user_apellidos: 'Apellidos/Surnames',
            user_telf: 'Telf Ex: 12345678',
            user_id: objectId,
            user_rol: 'Nada'
            
        }

        const user = await User.createOne(dataToCreate, {transaction});
        await transaction.commit();
        

        return res.status(201).json({message: "El usuairo ha sido creado"});

    } catch (error) {
        console.error('Error al insertar al usuario en la base de datos', error);
        return res.status(500).json(error.message);
    }


}

module.exports = {
    loginUser,
    registerUser,
    loginUserGoogle
};