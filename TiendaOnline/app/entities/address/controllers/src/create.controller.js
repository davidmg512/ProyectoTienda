const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const { ExceptionHandler } = require('kainda');

/**
 * Create new address
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createAddress(req, res) 
{
    const User = ModelsService.Models.Address;
    let transaction = await Address.transaction(DbService.get());
    try 
    {
        const address = await Address.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(address.toJSON());
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
    createAddress
};