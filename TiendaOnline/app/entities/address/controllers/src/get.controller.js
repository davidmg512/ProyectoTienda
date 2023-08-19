const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const { ExceptionHandler } = require('kainda');

/**
 * Get all addresss
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllAddresses(req, res) 
{
    const Address = ModelsService.Models.Address;
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
        const response = await Address.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(address => address.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

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
        const user = await Address.findById(req.params.user_id);
       
    
        return res.status(200).json(address.toJSON());

    } catch (error) {
        LogService.ErrorLogger.error(error);
        ExceptionHandler(error, res);
    }
}

module.exports = {
    getAllAddresses,
    getAddressesOfUser
};