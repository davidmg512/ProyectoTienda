const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const { ExceptionHandler } = require('kainda');


/**
 * Update product
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateProduct(req, res) {
    const Product = ModelsService.Models.Product;
    let transaction = await Product.transaction(DbService.get());
    try {
        let container = { ...req.body, [Product.modelId]: req.params.product_id };
        const product = await Product.Controller.__updateProduct(container, { transaction });
        await transaction.commit();
        return res.status(200).json(product.toJSON());
    } catch (error) {
        LogService.ErrorLogger.error(error);
        if (transaction) {
            await transaction.rollback();
        }
        ExceptionHandler(error, res);
    }
}

module.exports = {
    updateProduct
};