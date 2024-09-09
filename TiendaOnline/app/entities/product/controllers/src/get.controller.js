const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const { ExceptionHandler } = require('kainda');

/**
 * Get all products
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAllProducts(req, res) {
    const Product = ModelsService.Models.Product;
    try {
        const filterableKeys = [];
        const filterQuery = {};
        filterableKeys.forEach(key => { if (req.query[key]) { filterQuery[key] = req.query[key]; } });
        const response = await Product.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(product => product.toJSON()),
        });
    } catch (error) {
        LogService.ErrorLogger.error(error);
        ExceptionHandler(error, res);
    }
}

/**
 * Get product by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getProductById(req, res) {
    const Product = ModelsService.Models.Product;
    console.log(req.params.product_id);
    try {
        const product = await Product.findById(req.params.product_id);
        if (!product) {
            throw new Product.Exceptions.ProductNotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.product_id + " not found",
                error_data: {
                    req: req.body
                }
            })
        }
        return res.status(200).json(product.toJSON());
    } catch (error) {
        LogService.ErrorLogger.error(error);
        ExceptionHandler(error, res);
    }
}

/**
 * Get productos destacados
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getProductosDestacados(req,res) {
    const Product = ModelsService.Models.Product;

    try{
        const filterQuery = {};

        // La opción de paginación se maneja manualmente aquí:
        const queryOptions = {
            page: 1,
            limit: 100
        };

        const response = await Product.findPaginated(filterQuery, queryOptions);

        const sortedProducts = response.data.sort((a, b) => b.ventas - a.ventas).slice(0, 9);
        
        return res.status(200).json({
            ...response,
            data: sortedProducts.map(product => product.toJSON()),
        });
    }catch (error) {
        LogService.ErrorLogger.error(error);
        console.log(error);
        ExceptionHandler(error, res);
    }
}

/**
 * Get productos por categoria
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getByCategoria(req, res){
    const Product = ModelsService.Models.Product;

    try {
        const categoria = req.query.categoria;  // Captura el parámetro de consulta

        const filterQuery = {};
        if (categoria) {
            // Filtra productos que tengan al menos una categoría coincidente en el array "categorias"
            filterQuery.categorias = { $in: [categoria] };
        }

        // La opción de paginación se maneja manualmente aquí:
        const queryOptions = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 5
        };

        const response = await Product.findPaginated(filterQuery, queryOptions);

        return res.status(200).json({
            data: response,
        });

    } catch (error) {
        LogService.ErrorLogger.error(error);
        console.log(error);
        ExceptionHandler(error, res);
    }
}
    
/*
    const cf = cloudflare({
        email: 'susojeruso2000@gmail.com',
        token: '316430a42c83770acd2388043d75ca80b8169'
      });
      */
    
    async function getUrl(req, res){
/*
        try{
    
            const uploadResponse = await cf.request('POST','/images/v1/upload', {
    
                account_id: '7487b224e6bdb241146084a2bd8da49d',
                media_type: image/jpg,
    
            });
    
            const uploadUrl = uploadResponse.result.upload_url;
            return uploadUrl;

    
        }catch(error){
            console.log(error);
        }
    */
    }



module.exports = {
    getAllProducts,
    getProductById,
    getUrl,
    getProductosDestacados,
    getByCategoria
};