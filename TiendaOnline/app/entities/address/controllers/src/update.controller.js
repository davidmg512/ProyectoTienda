const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const { ExceptionHandler } = require('kainda');
const mongoose = require('mongoose');



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
            address_postal: req.body.address_postal,
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


async function setMainAddress(req,res){
    const Address = ModelsService.Models.Address;
    const ObjectID = mongoose.Types.ObjectId;


    const user_id = req.decodedTokenId;

    let transaction = await Address.transaction(DbService.get());

    const objectId = new ObjectID(req.params.address_id);

    try {
        // Establecer la dirección seleccionada como main_address
        await Address.subModel.updateOne({ _id: objectId, user_id }, { main_address: true });

        // Establecer todas las demás direcciones para el mismo usuario en main_address: false
        await Address.subModel.updateMany({ user_id, _id: { $ne: objectId } }, { main_address: false });

        await transaction.commit();

        res.status(200).json({ message: 'Dirección principal actualizada exitosamente' });

    }catch (error) {
        throw new Address.Exceptions.AddressNotFoundException({
            error_type: 'DIRECCION_NO_ENCONTRADA',
            error_message: 'La dirección no fue encontrada'
        });
    }
}

module.exports = {
    updateAddress,
    setMainAddress
};