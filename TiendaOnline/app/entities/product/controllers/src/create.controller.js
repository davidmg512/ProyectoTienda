const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const { ExceptionHandler } = require('kainda');

/**
 * Create new product
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createProduct(req, res) {
    const Product = ModelsService.Models.Product;
    let transaction = await Product.transaction(DbService.get());
    try {
        const product = await Product.Controller.__createProduct(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(product.toJSON());
    } catch (error) {
        LogService.ErrorLogger.error(error);
        if (transaction) {
            await transaction.rollback();
        }
        ExceptionHandler(error, res);
    }
}

async function nuevoProducto(req, res){
    const Product = ModelsService.Models.Product;
    let transaction = await Product.transaction(DbService.get());

    try{

    
    const product = await Address.createOne(req.body, { transaction });

    transaction.commit();
    return res.status(201).json(product.toJSON());



    }catch(error){
        console.log(error);
    }

}



module.exports = {
    createProduct,
    nuevoProducto
};