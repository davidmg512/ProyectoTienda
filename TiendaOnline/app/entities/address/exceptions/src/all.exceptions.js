const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    AddressException : KaindaException,
    AddressBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    AddressNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    AddressAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    AddressNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    AddressNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    AddressNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    AddressExceptionHandler: GenericKaindaExceptionHandler
}