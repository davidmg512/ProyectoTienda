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

/**
 * Get address by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */

async function getMainAddress(req, res){
    const Address = ModelsService.Models.Address;

    try {
        const userId = req.decodedTokenId; // Obtener el ID del usuario desde el token decodificado
        
        // Buscar la dirección principal para el usuario
        const address = await Address.findOne({
            user_id: userId,
            main_address: true
        });
        
        if (!address) {
            return res.status(200).json({ message: 'Main address not found' });
        }
        
        // Enviar la dirección como respuesta
        return res.status(200).json(address.toJSON());
    } catch (error) {
        console.error('Error fetching main address:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getAddressesOfUser,
    getMainAddress
};