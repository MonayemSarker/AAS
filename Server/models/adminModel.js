module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phoneNum: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        deptName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        currentAddr: {
            type: DataTypes.STRING,
            allowNull: true
        },
        permanentAddr: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Photo: {
            type: DataTypes.STRING,
            allowNull: true
        }

    })

    return Admin
}