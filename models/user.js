const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Employee, {
                foreignKey: "user_emp_ID",
                as: 'user_emp_data'
            })

            User.belongsTo(models.RoleManager, {
                foreignKey: "user_role",
                as: 'user_roll_data'
            })

            User.belongsTo(models.AttendanceConfiguration, {
                foreignKey: "attendence_config_id",
                as: 'attendence_config_data'
            })


        }
    }

    User.init({
        leave_config_type_id: {
            type: DataTypes.INTEGER,
            field: 'leave_config_type_id'
        },
        leave_type_id: {
            type: DataTypes.INTEGER,
            field: 'leave_type_id'
        },
        department_id: {
            type: DataTypes.INTEGER,
            field: 'department_id'
        },
        user_emp_ID: {
            type: DataTypes.INTEGER,
            field: 'user_emp_ID'
        },
        user_candidate_id: {
            type: DataTypes.INTEGER,
            field: 'user_candidate_id'
        },
        user_role: {
            type: DataTypes.INTEGER,
            field: 'user_role'
        },
        leave_config_id: {
            type: DataTypes.INTEGER,
            field: 'leave_config_id'
        },
        attendence_config_id: {
            type: DataTypes.INTEGER,
            field: 'attendence_config_id'
        },
        first_name: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        last_name: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        work_email: {
            type: DataTypes.STRING,
            field: 'work_email'
        },
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        mobile_no: {
            type: DataTypes.STRING,
            field: 'mobile_no'
        },
        user_type: {
            type: DataTypes.STRING,
            field: 'user_type',
            defaultValue: 'admin',
        },
        password: {
            type: DataTypes.STRING,
            field: 'password'
        },
        isFirst: {
            type: DataTypes.BOOLEAN,
            field: 'isFirst',
            defaultValue: true,
        },
        isCompany: {
            type: DataTypes.BOOLEAN,
            field: 'isCompany',
            defaultValue: true,
        },
        isBranch: {
            type: DataTypes.BOOLEAN,
            field: 'isBranch',
            defaultValue: true,
        },
        isDepartment: {
            type: DataTypes.BOOLEAN,
            field: 'isDepartment',
            defaultValue: true,
        },
        isDesignation: {
            type: DataTypes.BOOLEAN,
            field: 'isDesignation',
            defaultValue: true,
        },
        late_coming_Early_Going_id: {
            type: DataTypes.INTEGER,
            field: 'late_coming_Early_Going_id'
        },
        company_id:{
            type: DataTypes.INTEGER,
            field: 'company_id'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        // manager_id:{
        //     type:DataTypes.INTEGER,
        //     field: 'manager_id'
        // }
    }, {
        sequelize,
        tableName: 'user',
        modelName: 'User',
        timestamps: true
    })
    return User
}