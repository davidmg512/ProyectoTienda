const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Create new orders
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function createOrders(req, res) 
{
    /*
    const Orders = ModelsService.Models.Orders;
    let transaction = await Orders.transaction(DbService.get());
    try 
    {
        const orders = await Orders.createOne(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(orders.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }*/

    const Orders = ModelsService.Models.Orders;
    const mongoose = DbService.get();
    const session = await mongoose.startSession(); // Inicia una sesión de Mongoose para la transacción

    try {
        session.startTransaction(); // Comienza la transacción

        // Crea el nuevo pedido usando el método `create` de Mongoose
        const orders = await Orders.create([req.body], { session });

        await session.commitTransaction(); // Compromete la transacción
        session.endSession(); // Finaliza la sesión

        return res.status(201).json(orders); // Devuelve el pedido creado
    } catch (error) {
        // En caso de error, realiza un rollback
        await session.abortTransaction(); // Aborta la transacción
        session.endSession(); // Finaliza la sesión

        LogService.ErrorLogger.error(error); // Registra el error
        ExceptionService.handle(error, res); // Maneja el error
    }
}

module.exports = {
    createOrders
};