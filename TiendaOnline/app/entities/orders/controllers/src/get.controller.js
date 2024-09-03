const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");

/**
 * Get all orderss
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllOrderss(req, res) 
{
    const Orders = ModelsService.Models.Orders;
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
        const response = await Orders.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(orders => orders.toJSON()),
        });
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get orders by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getOrdersById(req, res) 
{
    const Orders = ModelsService.Models.Orders;
    try 
    {
        const orders = await Orders.findById(req.params.orders_id);
        if (!orders) 
        {
            throw new Orders.Exceptions.OrdersNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.orders_id + " not found",
                error_data: {
                    req: req.body
                }
            });
        }
        return res.status(200).json(orders.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

/**
 * Get orders by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getOrdersByUser(req, res) 
{
    const Orders = ModelsService.Models.Orders;
    const userId = req.params.user_id; // Asegúrate de que este es el ID del usuario que estás buscando

    try {
        // Usa el método personalizado para encontrar pedidos por user_id
        const orders = await Orders.findByUserId(userId);
        
        // Verifica si se encontraron pedidos
        if (orders.length === 0) {
            throw new Orders.Exceptions.OrdersNotFoundException({
                error_type: "NOT_FOUND",
                error_message: `No orders found for user ID: ${userId}`,
                error_data: {
                    req: req.body
                }
            });
        }

        return res.status(200).json(orders);
    } catch (error) {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllOrderss,
    getOrdersById,
    getOrdersByUser
};