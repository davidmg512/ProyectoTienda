const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const { ExceptionHandler } = require('kainda');

/**
 * Delete product by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function deleteProduct(req, res) {
    const Product = ModelsService.Models.Product;
    let transaction = await Product.transaction(DbService.get());
    try {
        const product = await Product.Controller.__deleteProduct(req.params.product_id ?? req.body.product_id, { transaction });
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
    deleteProduct
};