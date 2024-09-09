const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update user
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
/*async function updateUser(req, res) 
{
    const User = ModelsService.Models.User;
    let transaction = await User.transaction(DbService.get());
    try 
    {
        const user = await User.Controller.updateOne(
            req.body,
            {
                [User.modelId]: req.params.user_id,
            },
            {
                transaction
            }
        );
        await transaction.commit();
        return res.status(200).json(user.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}*/

async function updateUser(req, res) {

    const User = ModelsService.Models.User;
    let transaction = await User.transaction(DbService.get());


    try {

        const userEmail = req.decodedTokenEmail;

        
        const numtelfSecure = req.body.user_telf;

        const numValid = await User.subModel.ValidatePhoneNumber(numtelfSecure);

        const dataToUpdate = {
            user_nombre: req.body.user_nombre,
            user_apellidos: req.body.user_apellidos,
            user_telf: req.body.user_telf,
                    
        }

        const user = await User.subModel.updateOne(
            { user_email: userEmail },
            dataToUpdate
        );

        await transaction.commit();
        

        return res.status(201).json({message: "actualizado correctamente"});

    } catch (error) {
        console.error('Error al actualizar', error);
        return res.status(500).json(error.message);
    }


}

async function updateAdmin(req, res){

    const User = ModelsService.Models.User;
    let transaction = await User.transaction(DbService.get());

try {

    const userId = req.params.user_id;

    // Obtener el usuario actual
    const currentUser = await User.subModel.findOne({ user_id: userId });

    let updatedUserRol = "";

    if(currentUser.user_rol == "admin"){
         updatedUserRol = "noAdmin";
    }else if(currentUser.user_rol != "admin"){
         updatedUserRol = "admin";
    }

    const dataToUpdate = {
        user_rol: updatedUserRol,
    };

    const user = await User.subModel.updateOne(
        { user_id: userId },
        dataToUpdate
    );

    await transaction.commit();
    return res.status(201).json({ message: "actualizado correctamente" });

} catch (error) {
    console.error('Error al actualizar', error);
    return res.status(500).json(error.message);
}


}


module.exports = {
    updateUser,
    updateAdmin
};