const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    UserException : KaindaException,
    UserBadRequestException : GenericKaindaExceptions.Kainda400Exception,
    UserNotFoundException : GenericKaindaExceptions.Kainda404Exception,
    UserAlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    UserNotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    UserNotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    UserNotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    UserExceptionHandler: GenericKaindaExceptionHandler
};