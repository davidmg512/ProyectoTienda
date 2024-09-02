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
        const topProducts = await Product.findPaginated({})
            .sort({ ventas: -1 })
            .limit(9)
            .exec();
        
        return res.status(200).json({
            success: true,
            data: topProducts.map(product => product.toJSON())
        });
    }catch (error) {
        LogService.ErrorLogger.error(error);
        ExceptionService.handle(error, res);
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
    getProductosDestacados
};