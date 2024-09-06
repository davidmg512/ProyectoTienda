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
    
    const Orders = ModelsService.Models.Orders;
    let transaction = await Orders.transaction(DbService.get());

    try {
        const user_id = req.decodedTokenId;  // Suponiendo que el ID del usuario viene del token
        const productos = req.body.items.map(item => ({
            producto_id: item.id,
            nombre: item.nombre,
            cantidad: item.cantidad,
            precio: item.precio,
            imagen: item.imagen
        }));

        const total = productos.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);

        const address = req.body.address;

        const orderData = {
            user_id: user_id,  // Suponiendo que el ID del usuario se almacena como ObjectId
            productos: productos,
            total: total,
            fecha: new Date(),  // Fecha actual
            estado: 'Pendiente',
            address: address
        };

        // Crear el pedido usando `createOne` con la transacción
        const order = await Orders.createOne(orderData, { transaction });

        await transaction.commit();
        return res.status(201).json(order.toJSON());
    } catch (error) {
        await transaction.rollback();  // Revertir la transacción en caso de error
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });  // Manejar la respuesta de error
    }
}

module.exports = {
    createOrders
};