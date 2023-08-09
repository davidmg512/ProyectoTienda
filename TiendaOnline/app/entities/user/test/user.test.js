const EndpointTests = require("./src/endpoint");
const UnitTests = require("./src/unit");

describe("User", function () 
{

    for (let test in UnitTests) 
    {
        UnitTests[test]();
    }

    for (let test in EndpointTests) 
    {
        EndpointTests[test]();
    }

});