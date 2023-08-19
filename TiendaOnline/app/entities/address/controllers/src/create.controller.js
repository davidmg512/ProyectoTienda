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
    const Address = ModelsService.Models.Address;
    let transaction = await Address.transaction(DbService.get());
    try 
    {
        const user_id = req.decodedTokenId;
        req.body.user_id = user_id;
        const address = await Address.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(address.toJSON());
    }
    catch (error) 
    {
        console.log(error);
    }
}

module.exports = {
    createAddress
};