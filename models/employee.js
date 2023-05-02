const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        static associate(models) {
            // Employee.hasOne(models.OnCrewInRoster, {
            //     foreignKey: "on_employee_id"
            // })
            // Employee.hasOne(models.OffCrewInRoster, {
            //     foreignKey: "off_employee_id"
            // })

            Employee.belongsTo(models.Branch, {
                foreignKey: "branch_id",
                as: 'branch'
            })

            Employee.belongsTo(models.Department, {
                foreignKey: "department_id",
                as: 'department_data'
            })

            Employee.belongsTo(models.Designation, {
                foreignKey: "designation_id",
                as: 'designation_data'
            })

            Employee.belongsTo(models.Company, {
                foreignKey: "company_id",
                as: 'company_data'
            })

            Employee.belongsTo(models.Owner, {
                foreignKey: "user_owner_id",
                as: 'user_owner_data'
            })

            Employee.belongsTo(models.Package, {
                foreignKey: "emp_package",
                as: 'package_data'
            })

            Employee.belongsTo(models.Shift, {
                foreignKey: "emp_shift",
                as: 'shift_data'
            })

            Employee.belongsTo(models.RoleManager, {
                foreignKey: "emp_role",
                as: 'emp_role_data'
            })

            // Employee.belongsTo(models.AssignPackage, {
            //     foreignKey: "employee_packages",
            //     as: 'employee_packages_data'
            // })


            // Employee.hasOne(models.Attendence, {
            //     foreignKey: 'attendence_emp_id',
            // })

            Employee.hasOne(models.Salary, {
                foreignKey: 'employeeName'
            })

            Employee.hasOne(models.DepartmentManager, {
                foreignKey: 'manager_id'
            })

            Employee.hasOne(models.User, {
                foreignKey: 'user_emp_ID'
            })

            Employee.hasOne(models.AssignPackage, {
                foreignKey: 'emp_id'
            })

            Employee.hasOne(models.Department, {
                foreignKey: 'manager_id'
            })

            Employee.hasOne(models.Attendence, {
                foreignKey: 'employee_id'
            })

            Employee.hasOne(models.employeeLoan, {
                foreignKey: 'loan_employee_name'
            })

            Employee.hasOne(models.Employee_Leave, {
                foreignKey: "manager_id"
            })

            Employee.hasOne(models.Employee_Leave, {
                foreignKey: "emp_id"
            })

            Employee.hasOne(models.AlwaysPresentEmp, {
                foreignKey: "employee_id"
            })

            Employee.hasOne(models.RegularizeAttendance, {
                foreignKey: "emp_id"
            })

            Employee.hasOne(models.ExitDetails, {
                foreignKey: "employee_name"
            })

            Employee.hasOne(models.ExitDetails, {
                foreignKey: "interviewer"
            })
        }
    }
    Employee.init({
        // todo uncomment
        emp_role: {
            type: DataTypes.INTEGER,
            field: 'emp_role'
        },
        emp_package: {
            type: DataTypes.INTEGER,
            field: 'emp_package'
        },
        emp_shift: {
            type: DataTypes.INTEGER,
            field: 'emp_shift'
        },
        user_owner_id: {
            type: DataTypes.INTEGER,
            field: 'user_owner_id'
        },
        branch_id: {
            type: DataTypes.INTEGER,
            field: 'branch_id'
        },
        department_id: {
            type: DataTypes.INTEGER,
            field: 'department_id'
        },
        designation_id: {
            type: DataTypes.INTEGER,
            field: 'designation_id'
        },
        company_id: {
            type: DataTypes.INTEGER,
            field: 'company_id'
        },
        title: {
            type: DataTypes.STRING,
            field: 'title'
        },
        first_name: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        middle_name: {
            type: DataTypes.STRING,
            field: 'middle_name'
        },
        last_name: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        emp_type: {
            type: DataTypes.STRING,
            field: 'emp_type'
        },
        working_location: {
            type: DataTypes.STRING,
            field: 'working_location'
        },
        date_of_joining: {
            type: DataTypes.DATE,
            field: 'date_of_joining'
        },
        gender: {
            type: DataTypes.STRING,
            field: 'gender'
        },
        emp_id: {
            type: DataTypes.STRING,
            field: 'emp_id'
        },
        manager_name: {
            type: DataTypes.STRING,
            field: 'manager_name'
        },
        marital_status: {
            type: DataTypes.STRING,
            field: 'marital_status'
        },
        date_of_birth: {
            type: DataTypes.DATE,
            field: 'date_of_birth'
        },
        blood_group: {
            type: DataTypes.STRING,
            field: 'blood_group'
        },
        nationality: {
            type: DataTypes.STRING,
            field: 'nationality'
        },
        languages: {
            type: DataTypes.STRING,
            field: 'languages'
        },
        highest_qualification: {
            type: DataTypes.STRING,
            field: 'highest_qualification'
        },
        work_experience: {
            type: DataTypes.STRING,
            field: 'work_experience'
        },
        mobile_no: {
            type: DataTypes.STRING,
            field: 'mobile_no'
        },

        work_email: {
            type: DataTypes.STRING,
            field: 'work_email'
        },
        email: {
            type: DataTypes.STRING,
            field: 'email'
        },
        // address
        permanent_address: {
            type: DataTypes.STRING,
            field: 'permanent_address'
        },
        country: {
            type: DataTypes.STRING,
            field: 'country'
        },
        state: {
            type: DataTypes.STRING,
            field: 'state'
        },
        district: {
            type: DataTypes.STRING,
            field: 'district'
        },
        city: {
            type: DataTypes.STRING,
            field: 'city'
        },
        zipcode: {
            type: DataTypes.STRING,
            field: 'zipcode'
        },
        password: {
            type: DataTypes.STRING,
            field: 'password'
        },
        // temperory address
        temp_country: {
            type: DataTypes.STRING,
            field: 'temp_country'
        },
        temp_city: {
            type: DataTypes.STRING,
            field: 'temp_city'
        },
        temp_destrict: {
            type: DataTypes.STRING,
            field: 'temp_destrict'
        },
        temp_zip: {
            type: DataTypes.STRING,
            field: 'temp_zip'
        },
        temp_state: {
            type: DataTypes.STRING,
            field: 'temp_state'
        },
        temporary_address: {
            type: DataTypes.STRING,
            field: 'temporary_address'
        },
        // communication address
        comm_address: {
            type: DataTypes.STRING,
            field: 'comm_address'
        },
        comm_country: {
            type: DataTypes.STRING,
            field: 'comm_country'
        },
        comm_city: {
            type: DataTypes.STRING,
            field: 'comm_city'
        },
        comm_destrict: {
            type: DataTypes.STRING,
            field: 'comm_destrict'
        },
        comm_zip: {
            type: DataTypes.STRING,
            field: 'comm_zip'
        },
        comm_state: {
            type: DataTypes.STRING,
            field: 'comm_state'
        },
        // ========================
        nominee_address: {
            type: DataTypes.STRING,
            field: 'nominee_address'
        },
        nominee_mobile_no: {
            type: DataTypes.STRING,
            field: 'nominee_mobile_no'
        },
        nominee_email: {
            type: DataTypes.STRING,
            field: 'nominee_email'
        },
        relation_with_employee: {
            type: DataTypes.STRING,
            field: 'relation_with_employee'
        },
        nominee_name: {
            type: DataTypes.STRING,
            field: 'nominee_name'
        },

        bank_name: {
            type: DataTypes.STRING,
            field: 'bank_name'
        },
        bank_address: {
            type: DataTypes.STRING,
            field: 'bank_address'
        },
        account_no: {
            type: DataTypes.STRING,
            field: 'account_no'
        },
        bank_branch: {
            type: DataTypes.STRING,
            field: 'bank_branch'
        },
        attendance_code: {
            type: DataTypes.STRING,
            field: 'attendance_code'
        },
        nominee_telephone_no: {
            type: DataTypes.STRING,
            field: 'nominee_telephone_no'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        create_user_check: {
            type: DataTypes.BOOLEAN,
            field: 'create_user_check',
            defaultValue: false,
        },
        Same_as_Temporary: {
            type: DataTypes.BOOLEAN,
            field: 'Same_as_Temporary',
            defaultValue: false,
        },
        Same_as_Permanent: {
            type: DataTypes.BOOLEAN,
            field: 'Same_as_Permanent',
            defaultValue: false,
        },
        // 
        company_type: {
            type: DataTypes.STRING,
            field: 'company_type'
        },
        crew_type: {
            type: DataTypes.STRING,
            field: 'crew_type'
        },
        remark: {
            type: DataTypes.STRING,
            field: 'remark'
        },
        employee_status: {
            type: DataTypes.STRING,
            field: 'employee_status'
        },
        employee_classification: {
            type: DataTypes.STRING,
            field: 'employee_classification'
        },
        religion: {
            type: DataTypes.STRING,
            field: 'religion'
        },
        no_of_dependency: {
            type: DataTypes.INTEGER,
            field: 'no_of_dependency'
        },
        nearest_domestic_airport: {
            type: DataTypes.STRING,
            field: 'nearest_domestic_airport'
        },
        nearest_internatinal_airport: {
            type: DataTypes.STRING,
            field: 'nearest_internatinal_airport'
        },
        safty_shoe_size: {
            type: DataTypes.STRING,
            field: 'safty_shoe_size'
        },
        last_day: {
            type: DataTypes.STRING,
            field: 'last_day'
        },
        coverall_size: {
            type: DataTypes.STRING,
            field: 'coverall_size'
        },
        emergency_name: {
            type: DataTypes.STRING,
            field: 'emergency_name'
        },
        emergency_relation_employee: {
            type: DataTypes.STRING,
            field: 'emergency_relation_employee'
        },
        emergency_telephone_no: {
            type: DataTypes.INTEGER,
            field: 'emergency_telephone_no'
        },
        emergency_cellphone_no: {
            type: DataTypes.INTEGER,
            field: 'emergency_cellphone_no'
        },
        emergency_address: {
            type: DataTypes.STRING,
            field: 'emergency_address'
        },
        emergency_Email: {
            type: DataTypes.STRING,
            field: 'emergency_Email'
        },
        cv_approvel: {
            type: DataTypes.BOOLEAN,
            field: 'cv_approvel',
            defaultValue: false,
        },
        cv_uploade: {
            type: DataTypes.STRING,
            field: 'cv_uploade'
        },
        smartcard_approvel: {
            type: DataTypes.BOOLEAN,
            field: 'smartcard_approvel',
            defaultValue: false,
        },
        smartcard_upload: {
            type: DataTypes.STRING,
            field: 'smartcard_upload'
        },
        // ==========================
        personal_telephone: {
            type: DataTypes.STRING,
            field: 'personal_telephone'
        },
        pan_no: {
            type: DataTypes.STRING,
            field: 'pan_no'
        },
        upload_pan: {
            type: DataTypes.STRING,
            field: 'upload_pan'
        },
        aadhar_no: {
            type: DataTypes.STRING,
            field: 'aadhar_no'
        },
        upload_aadhar: {
            type: DataTypes.STRING,
            field: 'upload_aadhar'
        },
        passport_no: {
            type: DataTypes.STRING,
            field: 'passport_no'
        },
        restriction_passport: {
            type: DataTypes.STRING,
            field: 'restriction_passport'
        },
        date_of_issue: {
            type: DataTypes.DATE,
            field: 'date_of_issue'
        },
        date_of_expiry: {
            type: DataTypes.DATE,
            field: 'date_of_expiry'
        },
        place_of_issue: {
            type: DataTypes.STRING,
            field: 'place_of_issue'
        },
        place_of_birth: {
            type: DataTypes.STRING,
            field: 'place_of_birth'
        },
        passport_type: {
            type: DataTypes.STRING,
            field: 'passport_type'
        },
        upload_passport: {
            type: DataTypes.STRING,
            field: 'upload_passport'
        },
        issued_by: {
            type: DataTypes.STRING,
            field: 'passport_no'
        },
        smartcard_issued: {
            type: DataTypes.STRING,
            field: 'smartcard_issued'
        },
        cdc_no: {
            type: DataTypes.STRING,
            field: 'cdc_no'
        },
        cdc_date_of_issue: {
            type: DataTypes.DATE,
            field: 'cdc_date_of_issue'
        },
        cdc_date_of_expiry: {
            type: DataTypes.DATE,
            field: 'cdc_date_of_expiry'
        },
        upload_cdc: {
            type: DataTypes.STRING,
            field: 'upload_cdc'
        },
        emergency_name: {
            type: DataTypes.STRING,
            field: 'emergency_name'
        },
        emergency_relation_employee: {
            type: DataTypes.STRING,
            field: 'emergency_relation_employee'
        },
        emergency_telephone_no: {
            type: DataTypes.STRING,
            field: 'emergency_telephone_no'
        },
        emergency_cellphone_no: {
            type: DataTypes.STRING,
            field: 'emergency_cellphone_no'
        },
        emergency_address: {
            type: DataTypes.STRING,
            field: 'emergency_address'
        },
        emergency_Email: {
            type: DataTypes.STRING,
            field: 'emergency_Email'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt'
        },
        probation_period: {
            type: DataTypes.STRING,
            field: 'probation_period'
        },
        isExitDetail: {
            type: DataTypes.INTEGER,
            field: 'isExitDetail',
            defaultValue: false,
        }
    },
        {
            sequelize,
            tableName: 'employees',
            modelName: 'Employee',
            timestamps: true
        }
    )
    return Employee
}