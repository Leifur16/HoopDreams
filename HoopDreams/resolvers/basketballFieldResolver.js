

module.exports = {

    queries: {
        allBasketballFields: (parent, args, context) => {
            return context.basketballFields.response.body;
        },
        basketballField: (parent, args, context) => {
            return context.basketballFields.response.body.find(d => d.id === args.id)
        }
    },


};
