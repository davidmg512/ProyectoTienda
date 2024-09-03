const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update orders
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function updateOrders(req, res) 
{
    const Orders = ModelsService.Models.Orders;
    let transaction = await Orders.transaction(DbService.get());
    try 
    {
        const orders = await Orders.Controller.updateOne(
            req.body,
            {
                [Orders.modelId]: req.params.orders_id,
            },
            {
                transaction
            }
        );
        await transaction.commit();
        return res.status(200).json(orders.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    updateOrders
};