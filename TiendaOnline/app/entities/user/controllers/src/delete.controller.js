const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const admin = require('firebase-admin');

/**
 * Delete user by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteUser(req, res) 
{
    const User = ModelsService.Models.User;
    let transaction = await User.transaction(DbService.get());
    try 
    {
        const user = await User.deleteOne(req.params.user_id ?? req.body.user_id, { transaction });
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
}


module.exports = {
    deleteUser
};