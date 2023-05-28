module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verificationStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    })

    User.associate = (models) => {
        User.hasOne(models.Teacher)
        User.hasOne(models.Student)
        User.hasOne(models.Director)
        User.hasOne(models.Admin)
    }
    //User er notifications er relations baki

    return User
}