const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const { ExceptionHandler } = require('kainda');


/**
 * Get address by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAddressesOfUser(req, res) {

    const Address = ModelsService.Models.Address;
    try {
        const filterableKeys = [];
        const filterQuery = {};

        const userId = req.decodedTokenId;

        if (userId) {
            filterQuery.user_id = userId;
        }

        filterableKeys.forEach(key => { if (req.query[key]) { filterQuery[key] = req.query[key]; } });

        const response = await Address.findPaginated(filterQuery, req.query);

        return res.status(200).json({
            ...response,
            data: response.data.map(cliente => cliente.toJSON()),
        });
    } catch (error) {
        console.log(error);
        LogService.ErrorLogger.error(error);
        ExceptionHandler(error, res);
    }
}


module.exports = {
    getAddressesOfUser
};