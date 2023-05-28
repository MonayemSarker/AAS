
module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        courseName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        courseCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Course.associate = (models) => {
        Course.belongsToMany(models.Teacher, {
            through: 'TeacherCourse',
            timestamps: false,
        });
        Course.belongsToMany(models.Student, {
            through: 'StudentCourse',
            timestamps: false,
        });
    };

    return Course;
};
