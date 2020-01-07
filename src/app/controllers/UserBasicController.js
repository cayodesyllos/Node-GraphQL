const { user_basic } = require('../models');
const Sequelize = require('sequelize');
const config = require('../../config/database');
const sequelize = new Sequelize(config.database, config.username, config.password, config);
class UserBasicController {
    async add(params) {
        let transaction;

        try {
            // get transaction
            transaction = await sequelize.transaction();

            let response = await user_basic.create({
                name: params.name,
                real_name: params.real_name,
                email: params.email,
                university_inscription: params.university_inscription,
                password: params.password,
                age: params.age,
                id_degree: params.id_degree,
                login_type: params.login_type,
                status: params.status,
                gender: params.gender,
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
            let response = await user_basic.findAll();
            response.password = response.password_hash;
            return response;
        } catch (err) {
            return err;
        }

    }
}


module.exports = new UserBasicController()