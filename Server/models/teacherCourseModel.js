module.exports = (sequelize, DataTypes) => {
    const TeacherCourse = sequelize.define('TeacherCourse', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
    }, {
        timestamps: false // Disable timestamps
    });

    TeacherCourse.associate = (models) => {
        TeacherCourse.belongsTo(models.Teacher);
        TeacherCourse.belongsTo(models.Course);

    }

    return TeacherCourse;
}