const { message } = require('../models');
const Sequelize = require('sequelize');
const config = require('../../config/database');
const sequelize = new Sequelize(config.database, config.username, config.password, config);
class MessageController {
    async add(params) {
        let transaction;

        try {
            // get transaction
            transaction = await sequelize.transaction();

            //check if there is a match with this id and the owner is user1 or user2
            let response = await message.create({
                id_match: params.id_match,
                id_owner: params.id_owner,
                content: params.content
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

    async get(params) {
        try {
            let response = await message.findAll({ where: { id_match: params.id_match } });
            return response;
        } catch (err) {
            return err;
        }

    }
}


module.exports = new MessageController()