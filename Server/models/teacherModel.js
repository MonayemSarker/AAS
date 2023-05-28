module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('Teacher', {

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
        },

    })

    Teacher.associate = (models) => {
        Teacher.belongsToMany(models.Course, {
            through: 'TeacherCourse',
            timestamps: false,
        })
    }

    return Teacher
}