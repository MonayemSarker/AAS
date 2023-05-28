module.exports = (sequelize, DataTypes) => {
    const StudentCourse = sequelize.define('StudentCourse', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
    }, {
        timestamps: false // Disable timestamps
    });

    StudentCourse.associate = (models) => {
        StudentCourse.belongsTo(models.Student);
        StudentCourse.belongsTo(models.Course);
        StudentCourse.associate = (models) => {
            StudentCourse.hasMany(models.Attendance, {
                onDelete: 'CASCADE',
            });
        };
    }

    return StudentCourse;
}