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
    const Productos = ModelsService.Models.Product;

    let transaction = await Orders.transaction(DbService.get());

    try {
        const user_id = req.decodedTokenId;  // Suponiendo que el ID del usuario viene del token
        const productos = req.body.items.map(item => ({
            producto_id: item.id,
            nombre: item.nombre,
            cantidad: item.cantidad,
            precio: item.precio,
            imagen: item.imagen,
            categorias: item.categorias
        }));

        const total = productos.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);

        const address = req.body.address;

        
        const categoriasSet = new Set();
        productos.forEach(item => {
            item.categorias.forEach(categoria => {
                categoriasSet.add(categoria);
            });
        });

        const categoriasArray = Array.from(categoriasSet);

        const orderData = {
            user_id: user_id,  // Suponiendo que el ID del usuario se almacena como ObjectId
            productos: productos,
            total: total,
            fecha: new Date(),  // Fecha actual
            estado: 'Pendiente',
            address: address,
            categorias: categoriasArray
        };

        
        // Crear el pedido usando `createOne` con la transacción
        const order = await Orders.createOne(orderData, { transaction });
        
        for (const item of productos) {

            const producto = await Productos.findById(item.producto_id);

            if(producto){
                const nuevasVentas = (producto.ventas || 0) + item.cantidad;

                const productoActualizado = await Productos.subModel.updateOne(
                    { _id: item.producto_id },
                    {ventas:nuevasVentas},
                    transaction
                );

                
            }
        }

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