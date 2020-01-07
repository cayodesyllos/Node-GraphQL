
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
    const user_basic = sequelize.define('user_basic', {
        name: DataTypes.STRING,
        real_name: DataTypes.STRING,
        email: DataTypes.STRING,
        university_inscription: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        age: DataTypes.INTEGER,
        id_degree: DataTypes.INTEGER,
        login_type: DataTypes.STRING,
        status: DataTypes.INTEGER,
        gender: DataTypes.CHAR,
    })
    user_basic.addHook('beforeSave', async (user_basic) => {
        if (user_basic.password) {
            user_basic.password_hash = await bcrypt.hash(user_basic.password, 8)
        }
    });
    return user_basic;
}
