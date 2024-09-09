const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const { ExceptionHandler } = require('kainda');
//const cloudflare = require('cloudflare-api');
const fetch = require('node-fetch').default;
const FormData = require('form-data');
const fs = require('fs')
/*
const cf = cloudflare({
    email: 'susojeruso2000@gmail.com',
    token: '316430a42c83770acd2388043d75ca80b8169'
});
*/
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

  

async function createProduct(req, res){
    
    const Product = ModelsService.Models.Product;
    let transaction = await Product.transaction(DbService.get());



    try{

    const {producto_nombre, producto_descripcion, producto_precio, producto_categoria} = req.body;
    const imageUrls = [];
    const imageFile = req.body.producto_imagenes.nombre;
    const imageStream = fs.readFile(imageFile.path);

    const cloudflareApiToken = "316430a42c83770acd2388043d75ca80b8169";
    
    const cloudflarePostBody = new FormData();
    cloudflarePostBody.append("file", imageStream);
    
    const cloudflareResponse = await fetch("https://api.cloudflare.com/client/v4/accounts/7487b224e6bdb241146084a2bd8da49d/images/v1", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${cloudflareApiToken}`,
            "Content-Type": "multipart/form-data"
        },
        body: cloudflarePostBody,
    });

    const cloudflareResponseBody = await cloudflareResponse.json();
    const imageUrl = cloudflareResponseBody.result.url;

    const newProduct = new Product({
        producto_nombre,
        producto_descripcion,
        producto_precio,
        producto_categoria,
        producto_imagenes: imageUrl
    })

    
    const product = await Product.createOne(newProduct, { transaction });

    transaction.commit();
    return res.status(201).json(product.toJSON());

    }catch(error){
        console.log(error);
    }

}



module.exports = {
    createProduct
};