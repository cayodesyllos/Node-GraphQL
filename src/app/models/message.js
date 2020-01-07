module.exports = (sequelize, DataTypes) => {
    const message = sequelize.define('message', {
        id_match: DataTypes.INTEGER,
        id_owner: DataTypes.INTEGER,
        content: DataTypes.STRING,
    })
    return message;
}
