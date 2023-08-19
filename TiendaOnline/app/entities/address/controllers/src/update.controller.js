const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const { ExceptionHandler } = require('kainda');


/**
 * Update address
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateAddress(req, res) {
    const Address = ModelsService.Models.Address;
    let transaction = await Address.transaction(DbService.get());
    try {
        let container = { ...req.body, [Address.modelId]: req.params.address_id };
        const address = await Address.Controller.__updateAddress(container, { transaction });
        await transaction.commit();
        return res.status(200).json(address.toJSON());
    } catch (error) {
        LogService.ErrorLogger.error(error);
        if (transaction) {
            await transaction.rollback();
        }
        ExceptionHandler(error, res);
    }
}

module.exports = {
    updateAddress
};