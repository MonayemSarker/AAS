module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define('Attendance', {


        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },

    })

    Attendance.associate = (models) => {
        Attendance.belongsTo(models.StudentCourse, {
            onDelete: 'CASCADE',
        });
    }
    //notifiaction er relationships

    return Attendance
}