const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const { ExceptionHandler } = require('kainda');

/**
 * Delete address by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteAddress(req, res) {
    const Address = ModelsService.Models.Address;
    let transaction = await Address.transaction(DbService.get());
    try {
        const address = await Address.Controller.__deleteAddress(req.params.address_id ?? req.body.address_id, { transaction });
        await transaction.commit();
        return res.status(200).json(address.toJSON());
    } catch (error) {

        console.log(error);
    }
}

async function deleteAddressesByUserId(req, res) {
    const Address = ModelsService.Models.Address;
    let transaction = await Address.transaction(DbService.get());
    
    try {
        const userId = req.params.user_id; 
        const result = await Address.deleteMany({ user_id: userId });

        await transaction.commit();
        
        return res.status(200).json({
            message: `${result.deletedCount} direcciones eliminadas para el usuario ${userId}`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}


module.exports = {
    deleteAddress,
    deleteAddressesByUserId
};