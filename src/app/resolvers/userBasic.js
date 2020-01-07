const UserBasicController = require('../controllers/UserBasicController')

const resolvers = {
    Mutation: {
        addUserBasic: (root, params) => UserBasicController.add(params),
    },
    Query: {
        userBasics: () => UserBasicController.get(),
    }
}

module.exports = resolvers