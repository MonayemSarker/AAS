module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        regNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        classRoll: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sDOB: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        phoneNum: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        deptName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        batch: {
            type: DataTypes.INTEGER,
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
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
    })

    Student.associate = (models) => {
        Student.belongsToMany(models.Course, {
            through: 'StudentCourse',
            foreignKey: 'regNumber',
            timestamp: false,
        });
    };

    return Student
}