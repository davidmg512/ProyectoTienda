const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Create new user
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createUser(req, res) 
{
    const User = ModelsService.Models.User;
    let transaction = await User.transaction(DbService.get());
    try 
    {
        const user = await User.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(user.toJSON());
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
    createUser
};