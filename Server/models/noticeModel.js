module.exports = (sequelize, DataTypes) => {
    const Notice = sequelize.define('Notice', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        receiver: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notice: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },

    })

    return Notice
}