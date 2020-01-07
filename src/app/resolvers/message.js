const MessageController = require('../controllers/MessageController')

const resolvers = {
    Mutation: {
        addMessage: (root, params) => MessageController.add(params),
    },
    Query: {
        messages: (root, params) => MessageController.get(params)
    }
}

module.exports = resolvers