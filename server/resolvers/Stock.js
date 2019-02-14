const Requisition = require('../models/Requisition');


const Stock = {
    requisitionHistory: async (parent, args, ctx, info) => {
        const requisitions = await Requisition.find({ item: parent._id });
        return requisitions;
    }
}

module.exports = Stock;

const errors = {
    graphQLErrors: [],
    networkError: {
        name: "ServerError",
        response: {},
        statusCode: 400,
        result: {
            errors: [
                {
                    message: "Cannot query field \"nae\" on type \"Stock\". Did you mean \"name\"?",
                    locations: [{ "line": 8, "column": 7 }],
                    extensions: {
                        code: "GRAPHQL_VALIDATION_FAILED",
                        exception: {
                            stacktrace: ["GraphQLError: Cannot query field \"nae\" on type \"Stock\". Did you mean \"name\"?", "    at Object.Field (/home/djangbahevans/Desktop/Makerspace-Inventory-System/node_modules/graphql/validation/rules/FieldsOnCorrectType.js:64:31)", "    at Object.enter (/home/djangbahevans/Desktop/Makerspace-Inventory-System/node_modules/graphql/language/visitor.js:334:29)", "    at Object.enter (/home/djangbahevans/Desktop/Makerspace-Inventory-System/node_modules/graphql/language/visitor.js:385:25)", "    at visit (/home/djangbahevans/Desktop/Makerspace-Inventory-System/node_modules/graphql/language/visitor.js:252:26)", "    at Object.validate (/home/djangbahevans/Desktop/Makerspace-Inventory-System/node_modules/graphql/validation/validate.js:63:22)", "    at validate (/home/djangbahevans/Desktop/Makerspace-Inventory-System/node_modules/apollo-server-core/dist/requestPipeline.js:172:32)", "    at Object.<anonymous> (/home/djangbahevans/Desktop/Makerspace-Inventory-System/node_modules/apollo-server-core/dist/requestPipeline.js:110:42)", "    at Generator.next (<anonymous>)", "    at fulfilled (/home/djangbahevans/Desktop/Makerspace-Inventory-System/node_modules/apollo-server-core/dist/requestPipeline.js:4:58)", "    at process._tickCallback (internal/process/next_tick.js:68:7)"]
                        }
                    }
                }
            ]
        }
    },
    message: "Network error: Response not successful: Received status code 400"
}