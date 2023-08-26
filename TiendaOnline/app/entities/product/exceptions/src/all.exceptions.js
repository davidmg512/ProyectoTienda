const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    ProductException : KaindaException,
    ProductBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    ProductNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    ProductAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    ProductNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    ProductNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    ProductNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    ProductExceptionHandler: GenericKaindaExceptionHandler
}