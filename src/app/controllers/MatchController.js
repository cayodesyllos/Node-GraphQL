const { match } = require('../models');
const Sequelize = require('sequelize');
const config = require('../../config/database');
const sequelize = new Sequelize(config.database, config.username, config.password, config);
class MatchController {
    async add(params) {
        let transaction;

        try {
            // get transaction
            transaction = await sequelize.transaction();

            let response = await match.create({
                id_user1: params.id_user1,
                id_user2: params.id_user2
            }, { transaction })

            // commit
            await transaction.commit();
            return response;
        } catch (err) {
            // Rollback transaction only if the transaction object is defined
            if (transaction) await transaction.rollback();
            return err;
        }

    }

    async get() {
        try {
            let response = await match.findAll();
            return response;
        } catch (err) {
            return err;
        }
    }

}


module.exports = new MatchController()