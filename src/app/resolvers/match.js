const MatchController = require('../controllers/MatchController')

const resolvers = {
    Mutation: {
        addMatch: (root, params) => MatchController.add(params),

    },
    Query: {
        matches: (root, params) => MatchController.get()
    }
}

module.exports = resolvers