const ModelsService = require("@services/models.service");
const { missingFieldsResponse } = require("kainda");


/**
 * Check if the required keys are present in the request body
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @param {Array} required_keys
 * @returns {void}
 */
async function checkRequiredKeys(req, res, next, required_keys = ModelsService.Models.User.create_required_keys) 
{
    if(required_keys.length === 0) 
    {
        return next();
    }
    let arrayOfKeys = [
        required_keys
    ];
    let response = missingFieldsResponse(arrayOfKeys, req.body);
    if(Object.keys(response).length > 0)
    {
        return res.status(400).json(response);
    }
    next();
}

module.exports = checkRequiredKeys;