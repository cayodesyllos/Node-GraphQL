const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { user_basic } = require('../models');
const auth = require('../../config/auth')
class SessionController {
    async add(params) {
        const { email, password } = params;
        const response = await user_basic.findOne({ where: { email: email } })
        console.log(password, response.password_hash);
        if (!response) {
            throw new Error("user does not exist");
        }

        if (!(await this.checkPassword(password, response.password_hash))) {
            throw new Error("Password does not match");
        }

        const { id, name } = response;

        let send = {
            id: id,
            name: name,
            email: email,
            jwt: jwt.sign({ id }, auth.secret,
                { expiresIn: auth.expiresIn })
        }

        console.log(send);

        return send;
    }

    checkPassword(password, password_hash) {
        return bcrypt.compare(password, password_hash);
    }
}

module.exports = new SessionController();