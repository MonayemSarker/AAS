module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {

        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        receiver: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        approval: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },
    })

    return Notification
}