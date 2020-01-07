module.exports = (sequelize, DataTypes) => {
    const match = sequelize.define('match', {
        id_user1: DataTypes.INTEGER,
        id_user2: DataTypes.STRING,
    })
    return match;
}
