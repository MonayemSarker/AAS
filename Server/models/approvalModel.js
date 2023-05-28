module.exports = (sequelize, DataTypes) => {
    const Approval = sequelize.define('Approval', {


        approveStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        regNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        }

    })

    return Approval
}