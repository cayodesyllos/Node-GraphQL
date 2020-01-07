const SessionController = require('../controllers/SessionController')

const resolvers = {
    Mutation: {
        addSession: (root, params) => SessionController.add(params),
    },
}

module.exports = resolvers;