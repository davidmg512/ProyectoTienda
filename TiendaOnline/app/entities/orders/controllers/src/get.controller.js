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

    try {

        const user_id = req.decodedTokenId;

        const filterableKeys = [];
        const filterQuery = {};

        if (user_id) {
            filterQuery.user_id = user_id;
        }

        filterableKeys.forEach(key => { if (req.query[key]) { filterQuery[key] = req.query[key]; } });

        const orders = await Orders.findPaginated(filterQuery, req.query)
        
        // Verifica si se encontraron pedidos
        if (orders.length === 0) {
            throw new Orders.Exceptions.OrdersNotFoundException({
                error_type: "NOT_FOUND",
                error_message: `No orders found for user ID: ${user_id}`,
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

/**
 * Get orders by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getCategorias(req, res) 
{
    const Orders = ModelsService.Models.Orders;
    

    try{
        const user_id = req.decodedTokenId;

        const filterableKeys = [];
        const filterQuery = {};

        if (user_id) {
            filterQuery.user_id = user_id;
        }

        filterableKeys.forEach(key => { 
            if (req.query[key]) { 
                filterQuery[key] = req.query[key]; 
            } 
        });

        // Obtener el resultado paginado
        const ordersResult = await Orders.findPaginated(filterQuery, req.query);

        // Acceder al array de pedidos desde ordersResult.data
        const orders = ordersResult.data;


        // Verificar si orders es un array
        if (!Array.isArray(orders)) {
            throw new Error('Unexpected format of orders data');
        }

        const categoriasSet = new Set();

        orders.forEach(order => {
            if (order.categorias) {
                order.categorias.forEach(categoria => {
                    categoriasSet.add(categoria);
                        
                    }
                );
            }
        });

        const categoriasArray = Array.from(categoriasSet);

        return res.status(200).json(categoriasArray);

    }catch(error){
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    getAllOrderss,
    getOrdersById,
    getOrdersByUser,
    getCategorias
};