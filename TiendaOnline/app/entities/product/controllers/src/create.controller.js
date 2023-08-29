const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const { ExceptionHandler } = require('kainda');
const cloudflare = require('cloudflare-api');

/*const cf = cloudflare({
    email: 'susojeruso2000@gmail.com',
    key: 't4gF1lEDe9K1SnqtZRCm0rLL6K4Bhwca'
});*/

/**
 * Create new product
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
/*async function createProduct(req, res) {
    const Product = ModelsService.Models.Product;
    let transaction = await Product.transaction(DbService.get());
    try {
        const product = await Product.Controller.__createProduct(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(product.toJSON());
    } catch (error) {
        LogService.ErrorLogger.error(error);
        if (transaction) {
            await transaction.rollback();
        }
        ExceptionHandler(error, res);
    }
}*/

const cf = cloudflare({
    email: 'susojeruso2000@gmail.com',
    token: 'BG1n8RakSRs_zs9yyHBvyg93KagSowaF9bYVod_a'
  });
  

async function createProduct(req, res){
    /*
    const Product = ModelsService.Models.Product;
    let transaction = await Product.transaction(DbService.get());*/ç



    try{

        const uploadResponse = await cf.request('POST','/images/v1/upload', {

            account_id: '7487b224e6bdb241146084a2bd8da49d',
            media_type: image/jpg,

        });

        const uploadUrl = uploadResponse.result.upload_url;
        return uploadUrl;

    /*const {producto_nombre, producto_descripcion, producto_precio, producto_categoria} = req.body;
    const imageUrls = [];

    const cf = cloudflare({
        email: 'susojeruso2000@gmail.com',
        token: '316430a42c83770acd2388043d75ca80b8169'
      });

    for(const imageFile of req.files){
        const imageStream = imageFile.buffer;
        const mediaType = imageFile.mimetype;
        const imageUpload = await cf.images.v1.upload({
            data: imageStream,
            account_id: '7487b224e6bdb241146084a2bd8da49d',
            media_type: mediaType
        })
        imageUrls.push(imageUpload.result.url);
    }

    const newProduct = new Product({
        producto_nombre,
        producto_descripcion,
        producto_precio,
        producto_categoria,
        producto_imagenes: imageUrls
    })

    
    const product = await Product.createOne(newProduct, { transaction });

    transaction.commit();
    return res.status(201).json(product.toJSON());*/

    }catch(error){
        console.log(error);
    }

}



module.exports = {
    createProduct
};