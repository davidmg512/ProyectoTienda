const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    OrdersException : KaindaException,
    OrdersBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    OrdersNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    OrdersAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    OrdersNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    OrdersNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    OrdersNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    OrdersExceptionHandler: GenericKaindaExceptionHandler
};