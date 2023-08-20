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
        const dataToUpdate = {

            address_country: req.body.address_country,
            address_province: req.body.address_province,
            address_town: req.body.address_town,
            street_and_number: req.body.street_and_number,
            additional_data: req.body.additional_data
                    
        }

        console.log(dataToUpdate.address_province);
        const address = await Address.subModel.updateOne({
            _id: req.params.address_id
        },dataToUpdate);


        await transaction.commit();
        return res.status(200).json(dataToUpdate);

    } catch (error) {
        console.log(error);
        throw new Address.Exceptions.AddressNotFoundException({
            error_type: "ADRESS_NOT_FOUND",
            error_message: "The adress wasn't found"
        })
    }
}

module.exports = {
    updateAddress
};