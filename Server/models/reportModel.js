module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('Report', {

        courseCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        regNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        percentage: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    })

    return Report
}