const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const { ExceptionHandler } = require("winston");
const admin = require("firebase-admin");

/**
 * Get all users
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllUsers(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const filterableKeys = [];
        const filterQuery = {};
        filterableKeys.forEach(key => 
        {
            if (req.query[key]) 
            {
                filterQuery[key] = req.query[key]; 
            } 
        });
        const response = await User.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(user => user.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get user by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getUserById(req, res) 
{
    const User = ModelsService.Models.User;
    try 
    {
        const user = await User.findById(req.params.user_id);
        if (!user) 
        {
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.user_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(user.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res); 
    }
}


async function getUserByNombre(req, res){

    const User = ModelsService.Models.User;

    try{
        let regex = new RegExp(req.params.user_nombre, 'i');
        let user = await User.findMany({
            user_nombre:
            {
                $regex: regex
            }
        });
        if(!user){
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.user_nombre + "not found",
                error_data:{
                    req: req.body
                }
            })
        }
        const serializedArray = user.map((objeto) => objeto.toJSON());
        return res.status(200).json(serializedArray);
    }
    catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }

}



async function getUserByEmail(req, res){
    const User = ModelsService.Models.User;

    try{

        const userId = req.decodedTokenId;

        const user = await User.subModel.findOne({
            user_id: userId
        });
        if(!user){
            throw new User.Exceptions.UserNotFoundException({
                error_type: "NOT_FOUND"
            })
            
        }
        return res.status(200).json(user);
    }catch (error)
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    getUserByNombre,
    getUserByEmail
};