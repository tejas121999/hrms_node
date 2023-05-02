const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserAccess extends Model {
        static associate(model) {
            UserAccess.belongsTo(model.RoleManager, {
                foreignKey: "role_id",
                as: 'role_data'
            })
        }
    }

    UserAccess.init({
        role_id: {
            type: DataTypes.INTEGER,
            field: 'role_id'
        },
        emp_id: {
            type: DataTypes.INTEGER,
            field: 'emp_id'
        },
        employee: {
            type: DataTypes.BOOLEAN,
            field: 'employee',
            defaultValue: false,
        },
        add_employee: {
            type: DataTypes.BOOLEAN,
            field: 'add_employee',
            defaultValue: false,
        },
        edit_employee: {
            type: DataTypes.BOOLEAN,
            field: 'edit_employee',
            defaultValue: false,
        },
        delete_employee: {
            type: DataTypes.BOOLEAN,
            field: 'delete_employee',
            defaultValue: false,
        },
        employee_grade: {
            type: DataTypes.BOOLEAN,
            field: 'employee_grade',
            defaultValue: false,
        },
        add_employee_grade: {
            type: DataTypes.BOOLEAN,
            field: 'add_employee_grade',
            defaultValue: false,
        },
        edit_employee_grade: {
            type: DataTypes.BOOLEAN,
            field: 'edit_employee_grade',
            defaultValue: false,
        },
        delete_employee_grade: {
            type: DataTypes.BOOLEAN,
            field: 'delete_employee_grade',
            defaultValue: false,
        },
        branch: {
            type: DataTypes.BOOLEAN,
            field: 'branch',
            defaultValue: false,
        },
        add_branch: {
            type: DataTypes.BOOLEAN,
            field: 'add_branch',
            defaultValue: false,
        },
        edit_branch: {
            type: DataTypes.BOOLEAN,
            field: 'edit_branch',
            defaultValue: false,
        },
        delete_branch: {
            type: DataTypes.BOOLEAN,
            field: 'delete_branch',
            defaultValue: false,
        },
        department: {
            type: DataTypes.BOOLEAN,
            field: 'department',
            defaultValue: false,
        },
        add_department: {
            type: DataTypes.BOOLEAN,
            field: 'add_department',
            defaultValue: false,
        },
        edit_department: {
            type: DataTypes.BOOLEAN,
            field: 'edit_department',
            defaultValue: false,
        },
        delete_department: {
            type: DataTypes.BOOLEAN,
            field: 'delete_department',
            defaultValue: false,
        },
        designation: {
            type: DataTypes.BOOLEAN,
            field: 'designation',
            defaultValue: false,
        },
        add_designation: {
            type: DataTypes.BOOLEAN,
            field: 'add_designation',
            defaultValue: false,
        },
        edit_designation: {
            type: DataTypes.BOOLEAN,
            field: 'edit_designation',
            defaultValue: false,
        },
        delete_designation: {
            type: DataTypes.BOOLEAN,
            field: 'delete_designation',
            defaultValue: false,
        },
        leave_type: {
            type: DataTypes.BOOLEAN,
            field: 'leave_type',
            defaultValue: false,
        },
        add_leave_type: {
            type: DataTypes.BOOLEAN,
            field: 'add_leave_type',
            defaultValue: false,
        },
        edit_leave_type: {
            type: DataTypes.BOOLEAN,
            field: 'edit_leave_type',
            defaultValue: false,
        },
        delete_leave_type: {
            type: DataTypes.BOOLEAN,
            field: 'delete_leave_type',
            defaultValue: false,
        },
        shift_type: {
            type: DataTypes.BOOLEAN,
            field: 'shift_type',
            defaultValue: false,
        },
        add_shift_type: {
            type: DataTypes.BOOLEAN,
            field: 'add_shift_type',
            defaultValue: false,
        },
        edit_shift_type: {
            type: DataTypes.BOOLEAN,
            field: 'edit_shift_type',
            defaultValue: false,
        },
        delete_shift_type: {
            type: DataTypes.BOOLEAN,
            field: 'delete_shift_type',
            defaultValue: false,
        },
        holiday: {
            type: DataTypes.BOOLEAN,
            field: 'holiday',
            defaultValue: false,
        },
        add_holiday: {
            type: DataTypes.BOOLEAN,
            field: 'add_holiday',
            defaultValue: false,
        },
        edit_holiday: {
            type: DataTypes.BOOLEAN,
            field: 'edit_holiday',
            defaultValue: false,
        },
        delete_holiday: {
            type: DataTypes.BOOLEAN,
            field: 'delete_holiday',
            defaultValue: false,
        },
        salary_component: {
            type: DataTypes.BOOLEAN,
            field: 'salary_component',
            defaultValue: false,
        },
        add_salary_component: {
            type: DataTypes.BOOLEAN,
            field: 'add_salary_component',
            defaultValue: false,
        },
        edit_salary_component: {
            type: DataTypes.BOOLEAN,
            field: 'edit_salary_component',
            defaultValue: false,
        },
        delete_salary_component: {
            type: DataTypes.BOOLEAN,
            field: 'delete_salary_component',
            defaultValue: false,
        },
        salary_structure: {
            type: DataTypes.BOOLEAN,
            field: 'salary_structure',
            defaultValue: false,
        },
        add_salary_structure: {
            type: DataTypes.BOOLEAN,
            field: 'add_salary_structure',
            defaultValue: false,
        },
        edit_salary_structure: {
            type: DataTypes.BOOLEAN,
            field: 'edit_salary_structure',
            defaultValue: false,
        },
        delete_salary_structure: {
            type: DataTypes.BOOLEAN,
            field: 'delete_salary_structure',
            defaultValue: false,
        },
        salary_grade: {
            type: DataTypes.BOOLEAN,
            field: 'salary_grade',
            defaultValue: false,
        },
        add_salary_grade: {
            type: DataTypes.BOOLEAN,
            field: 'add_salary_grade',
            defaultValue: false,
        },
        edit_salary_grade: {
            type: DataTypes.BOOLEAN,
            field: 'edit_salary_grade',
            defaultValue: false,
        },
        delete_salary_grade: {
            type: DataTypes.BOOLEAN,
            field: 'delete_salary_grade',
            defaultValue: false,
        },
        rig: {
            type: DataTypes.BOOLEAN,
            field: 'rig',
            defaultValue: false,
        },
        add_rig: {
            type: DataTypes.BOOLEAN,
            field: 'add_rig',
            defaultValue: false,
        },
        edit_rig: {
            type: DataTypes.BOOLEAN,
            field: 'edit_rig',
            defaultValue: false,
        },
        delete_rig: {
            type: DataTypes.BOOLEAN,
            field: 'delete_rig',
            defaultValue: false,
        },
        passenger: {
            type: DataTypes.BOOLEAN,
            field: 'passenger',
            defaultValue: false,
        },
        add_passenger: {
            type: DataTypes.BOOLEAN,
            field: 'add_passenger',
            defaultValue: false,
        },
        edit_passenger: {
            type: DataTypes.BOOLEAN,
            field: 'edit_passenger',
            defaultValue: false,
        },
        delete_passenger: {
            type: DataTypes.BOOLEAN,
            field: 'delete_passenger',
            defaultValue: false,
        },
        booking: {
            type: DataTypes.BOOLEAN,
            field: 'booking',
            defaultValue: false,
        },
        add_booking: {
            type: DataTypes.BOOLEAN,
            field: 'add_booking',
            defaultValue: false,
        },
        edit_booking: {
            type: DataTypes.BOOLEAN,
            field: 'edit_booking',
            defaultValue: false,
        },
        delete_booking: {
            type: DataTypes.BOOLEAN,
            field: 'delete_booking',
            defaultValue: false,
        },
        roster: {
            type: DataTypes.BOOLEAN,
            field: 'roster',
            defaultValue: false,
        },
        add_roster: {
            type: DataTypes.BOOLEAN,
            field: 'add_roster',
            defaultValue: false,
        },
        edit_roster: {
            type: DataTypes.BOOLEAN,
            field: 'edit_roster',
            defaultValue: false,
        },
        delete_roster: {
            type: DataTypes.BOOLEAN,
            field: 'delete_roster',
            defaultValue: false,
        },
        loan: {
            type: DataTypes.BOOLEAN,
            field: 'loan',
            defaultValue: false,
        },
        add_loan: {
            type: DataTypes.BOOLEAN,
            field: 'add_loan',
            defaultValue: false,
        },
        edit_loan: {
            type: DataTypes.BOOLEAN,
            field: 'edit_loan',
            defaultValue: false,
        },
        delete_loan: {
            type: DataTypes.BOOLEAN,
            field: 'delete_loan',
            defaultValue: false,
        },
        export_loan: {
            type: DataTypes.BOOLEAN,
            field: 'export_loan',
            defaultValue: false,
        },
        import_loan: {
            type: DataTypes.BOOLEAN,
            field: 'import_loan',
            defaultValue: false,
        },
        attendence: {
            type: DataTypes.BOOLEAN,
            field: 'attendence',
            defaultValue: false,
        },
        add_attendence: {
            type: DataTypes.BOOLEAN,
            field: 'add_attendence',
            defaultValue: false,
        },
        edit_attendence: {
            type: DataTypes.BOOLEAN,
            field: 'edit_attendence',
            defaultValue: false,
        },
        delete_attendence: {
            type: DataTypes.BOOLEAN,
            field: 'delete_attendence',
            defaultValue: false,
        },
        export_attendence: {
            type: DataTypes.BOOLEAN,
            field: 'export_attendence',
            defaultValue: false,
        },
        import_attendence: {
            type: DataTypes.BOOLEAN,
            field: 'import_attendence',
            defaultValue: false,
        },
        uploade_attendence: {
            type: DataTypes.BOOLEAN,
            field: 'uploade_attendence',
            defaultValue: false,
        },
        add_uploade_attendence: {
            type: DataTypes.BOOLEAN,
            field: 'add_uploade_attendence',
            defaultValue: false,
        },
        edit_uploade_attendence: {
            type: DataTypes.BOOLEAN,
            field: 'edit_uploade_attendence',
            defaultValue: false,
        },
        delete_uploade_attendence: {
            type: DataTypes.BOOLEAN,
            field: 'delete_uploade_attendence',
            defaultValue: false,
        },
        export_uploade_attendence: {
            type: DataTypes.BOOLEAN,
            field: 'export_uploade_attendence',
            defaultValue: false,
        },
        import_uploade_attendence: {
            type: DataTypes.BOOLEAN,
            field: 'import_uploade_attendence',
            defaultValue: false,
        },
        leave_request: {
            type: DataTypes.BOOLEAN,
            field: 'leave_request',
            defaultValue: false,
        },
        add_leave_request: {
            type: DataTypes.BOOLEAN,
            field: 'add_leave_request',
            defaultValue: false,
        },
        edit_leave_request: {
            type: DataTypes.BOOLEAN,
            field: 'edit_leave_request',
            defaultValue: false,
        },
        delete_leave_request: {
            type: DataTypes.BOOLEAN,
            field: 'delete_leave_request',
            defaultValue: false,
        },
        export_leave_request: {
            type: DataTypes.BOOLEAN,
            field: 'export_leave_request',
            defaultValue: false,
        },
        import_leave_request: {
            type: DataTypes.BOOLEAN,
            field: 'import_leave_request',
            defaultValue: false,
        },
        approve_request: {
            type: DataTypes.BOOLEAN,
            field: 'approve_request',
            defaultValue: false,
        },
        add_approve_request: {
            type: DataTypes.BOOLEAN,
            field: 'add_approve_request',
            defaultValue: false,
        },
        edit_approve_request: {
            type: DataTypes.BOOLEAN,
            field: 'edit_approve_request',
            defaultValue: false,
        },
        delete_approve_request: {
            type: DataTypes.BOOLEAN,
            field: 'delete_approve_request',
            defaultValue: false,
        },
        export_approve_request: {
            type: DataTypes.BOOLEAN,
            field: 'export_approve_request',
            defaultValue: false,
        },
        import_approve_request: {
            type: DataTypes.BOOLEAN,
            field: 'import_approve_request',
            defaultValue: false,
        },
        denied_request: {
            type: DataTypes.BOOLEAN,
            field: 'denied_request',
            defaultValue: false,
        },
        add_denied_request: {
            type: DataTypes.BOOLEAN,
            field: 'add_denied_request',
            defaultValue: false,
        },
        edit_denied_request: {
            type: DataTypes.BOOLEAN,
            field: 'edit_denied_request',
            defaultValue: false,
        },
        delete_denied_request: {
            type: DataTypes.BOOLEAN,
            field: 'delete_denied_request',
            defaultValue: false,
        },
        export_denied_request: {
            type: DataTypes.BOOLEAN,
            field: 'export_denied_request',
            defaultValue: false,
        },
        import_denied_request: {
            type: DataTypes.BOOLEAN,
            field: 'import_denied_request',
            defaultValue: false,
        },
        export_salary_structure: {
            type: DataTypes.BOOLEAN,
            field: 'export_salary_structure',
            defaultValue: false,
        },
        import_salary_structure: {
            type: DataTypes.BOOLEAN,
            field: 'import_salary_structure',
            defaultValue: false,
        },
        export_salary_component: {
            type: DataTypes.BOOLEAN,
            field: 'export_salary_component',
            defaultValue: false,
        },
        import_salary_component: {
            type: DataTypes.BOOLEAN,
            field: 'import_salary_component',
            defaultValue: false,
        },
        export_holiday: {
            type: DataTypes.BOOLEAN,
            field: 'export_holiday',
            defaultValue: false,
        },
        import_holiday: {
            type: DataTypes.BOOLEAN,
            field: 'import_holiday',
            defaultValue: false,
        },
        export_shift_type: {
            type: DataTypes.BOOLEAN,
            field: 'export_shift_type',
            defaultValue: false,
        },
        import_shift_type: {
            type: DataTypes.BOOLEAN,
            field: 'import_shift_type',
            defaultValue: false,
        },
        export_leave_type: {
            type: DataTypes.BOOLEAN,
            field: 'export_leave_type',
            defaultValue: false,
        },
        import_department: {
            type: DataTypes.BOOLEAN,
            field: 'import_department',
            defaultValue: false,
        },
        export_designation: {
            type: DataTypes.BOOLEAN,
            field: 'export_designation',
            defaultValue: false,
        },
        import_designation: {
            type: DataTypes.BOOLEAN,
            field: 'import_designation',
            defaultValue: false,
        },
        export_employee: {
            type: DataTypes.BOOLEAN,
            field: 'export_employee',
            defaultValue: false,
        },
        import_employee: {
            type: DataTypes.BOOLEAN,
            field: 'import_employee',
            defaultValue: false,
        },
        package: {
            type: DataTypes.BOOLEAN,
            field: 'package',
            defaultValue: false
        },
        add_package: {
            type: DataTypes.BOOLEAN,
            field: 'add_package',
            defaultValue: false
        },
        edit_package: {
            type: DataTypes.BOOLEAN,
            field: 'edit_package',
            defaultValue: false
        },
        delete_package: {
            type: DataTypes.BOOLEAN,
            field: 'delete_package',
            defaultValue: false
        },
        attendance_setting: {
            type: DataTypes.BOOLEAN,
            field: 'attendance_setting',
            defaultValue: false
        },
        attendance_notification: {
            type: DataTypes.BOOLEAN,
            field: 'attendance_notification',
            defaultValue: false
        },
        add_attendance_notification: {
            type: DataTypes.BOOLEAN,
            field: 'add_attendance_notification',
            defaultValue: false
        },
        edit_attendance_notification: {
            type: DataTypes.BOOLEAN,
            field: 'edit_attendance_notification',
            defaultValue: false
        },
        delete_attendance_notification: {
            type: DataTypes.BOOLEAN,
            field: 'delete_attendance_notification',
            defaultValue: false
        },
        import_attendance_notification: {
            type: DataTypes.BOOLEAN,
            field: 'import_attendance_notification',
            defaultValue: false
        },
        export_attendance_notification: {
            type: DataTypes.BOOLEAN,
            field: 'export_attendance_notification',
            defaultValue: false
        },
        always_present_employee: {
            type: DataTypes.BOOLEAN,
            field: 'always_present_employee',
            defaultValue: false
        },
        add_always_present_employee: {
            type: DataTypes.BOOLEAN,
            field: 'add_always_present_employee',
            defaultValue: false
        },
        edit_always_present_employee: {
            type: DataTypes.BOOLEAN,
            field: 'edit_always_present_employee',
            defaultValue: false
        },
        delete_always_present_employee: {
            type: DataTypes.BOOLEAN,
            field: 'delete_always_present_employee',
            defaultValue: false
        },
        import_always_present_employee: {
            type: DataTypes.BOOLEAN,
            field: 'import_always_present_employee',
            defaultValue: false
        },
        export_always_present_employee: {
            type: DataTypes.BOOLEAN,
            field: 'export_always_present_employee',
            defaultValue: false
        },
        late_coming_early_going: {
            type: DataTypes.BOOLEAN,
            field: 'late_coming_early_going',
            defaultValue: false
        },
        edit_late_coming_early_going: {
            type: DataTypes.BOOLEAN,
            field: 'edit_late_coming_early_going',
            defaultValue: false
        },
        overtime_notification: {
            type: DataTypes.BOOLEAN,
            field: 'overtime_notification',
            defaultValue: false
        },
        add_overtime_notification: {
            type: DataTypes.BOOLEAN,
            field: 'add_overtime_notification',
            defaultValue: false
        },
        edit_overtime_notification: {
            type: DataTypes.BOOLEAN,
            field: 'edit_overtime_notification',
            defaultValue: false
        },
        delete_overtime_notification: {
            type: DataTypes.BOOLEAN,
            field: 'delete_overtime_notification',
            defaultValue: false
        },
        overtime_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'overtime_configuration',
            defaultValue: false
        },
        edit_overtime_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'edit_overtime_configuration',
            defaultValue: false
        },
        attendance_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'attendance_configuration',
            defaultValue: false
        },
        edit_attendance_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'edit_attendance_configuration',
            defaultValue: false
        },
        leave_track: {
            type: DataTypes.BOOLEAN,
            field: 'leave_track',
            defaultValue: false
        },
        leave_type_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'leave_type_configuration',
            defaultValue: false
        },
        approval_in_leave_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'approval_in_leave_configuration',
            defaultValue: false
        },
        view_approval_in_leave_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'view_approval_in_leave_configuration',
            defaultValue: false
        },
        add_approval_in_leave_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'add_approval_in_leave_configuration',
            defaultValue: false
        },
        edit_approval_in_leave_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'edit_approval_in_leave_configuration',
            defaultValue: false
        },
        delete_approval_in_leave_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'delete_approval_in_leave_configuration',
            defaultValue: false
        },
        notification_in_leave_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'notification_in_leave_configuration',
            defaultValue: false
        },
        view_notification_in_leave_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'view_notification_in_leave_configuration',
            defaultValue: false
        },
        add_notification_in_leave_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'add_notification_in_leave_configuration',
            defaultValue: false
        },
        edit_notification_in_leave_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'edit_notification_in_leave_configuration',
            defaultValue: false
        },
        delete_notification_in_leave_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'delete_notification_in_leave_configuration',
            defaultValue: false
        },
        leave_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'leave_configuration',
            defaultValue: false
        },
        edit_leave_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'edit_leave_configuration',
            defaultValue: false
        },
        payroll: {
            type: DataTypes.BOOLEAN,
            field: 'payroll',
            defaultValue: false
        },
        employee_payroll: {
            type: DataTypes.BOOLEAN,
            field: 'employee_payroll',
            defaultValue: false
        },
        add_employee_payroll: {
            type: DataTypes.BOOLEAN,
            field: 'add_employee_payroll',
            defaultValue: false
        },
        edit_employee_payroll: {
            type: DataTypes.BOOLEAN,
            field: 'edit_employee_payroll',
            defaultValue: false
        },
        delete_employee_payroll: {
            type: DataTypes.BOOLEAN,
            field: 'delete_employee_payroll',
            defaultValue: false
        },
        process_payroll: {
            type: DataTypes.BOOLEAN,
            field: 'process_payroll',
            defaultValue: false
        },
        edit_process_payroll: {
            type: DataTypes.BOOLEAN,
            field: 'edit_process_payroll',
            defaultValue: false
        },
        tax_deduction_group: {
            type: DataTypes.BOOLEAN,
            field: 'tax_deduction_group',
            defaultValue: false
        },
        add_tax_deduction_group: {
            type: DataTypes.BOOLEAN,
            field: 'add_tax_deduction_group',
            defaultValue: false
        },
        edit_tax_deduction_group: {
            type: DataTypes.BOOLEAN,
            field: 'edit_tax_deduction_group',
            defaultValue: false
        },
        delete_tax_deduction_group: {
            type: DataTypes.BOOLEAN,
            field: 'delete_tax_deduction_group',
            defaultValue: false
        },
        import_tax_deduction_group: {
            type: DataTypes.BOOLEAN,
            field: 'import_tax_deduction_group',
            defaultValue: false
        },
        export_tax_deduction_group: {
            type: DataTypes.BOOLEAN,
            field: 'export_tax_deduction_group',
            defaultValue: false
        },
        tax_deduction_item: {
            type: DataTypes.BOOLEAN,
            field: 'tax_deduction_item',
            defaultValue: false
        },
        add_tax_deduction_item: {
            type: DataTypes.BOOLEAN,
            field: 'add_tax_deduction_item',
            defaultValue: false
        },
        edit_tax_deduction_item: {
            type: DataTypes.BOOLEAN,
            field: 'edit_tax_deduction_item',
            defaultValue: false
        },
        delete_tax_deduction_item: {
            type: DataTypes.BOOLEAN,
            field: 'delete_tax_deduction_item',
            defaultValue: false
        },
        import_tax_deduction_item: {
            type: DataTypes.BOOLEAN,
            field: 'import_tax_deduction_item',
            defaultValue: false
        },
        export_tax_deduction_item: {
            type: DataTypes.BOOLEAN,
            field: 'export_tax_deduction_item',
            defaultValue: false
        },
        income_tax_slab: {
            type: DataTypes.BOOLEAN,
            field: 'income_tax_slab',
            defaultValue: false
        },
        add_income_tax_slab: {
            type: DataTypes.BOOLEAN,
            field: 'add_income_tax_slab',
            defaultValue: false
        },
        edit_income_tax_slab: {
            type: DataTypes.BOOLEAN,
            field: 'edit_income_tax_slab',
            defaultValue: false
        },
        delete_income_tax_slab: {
            type: DataTypes.BOOLEAN,
            field: 'delete_income_tax_slab',
            defaultValue: false
        },
        import_income_tax_slab: {
            type: DataTypes.BOOLEAN,
            field: 'import_income_tax_slab',
            defaultValue: false
        },
        export_income_tax_slab: {
            type: DataTypes.BOOLEAN,
            field: 'export_income_tax_slab',
            defaultValue: false
        },
        lwf_slab: {
            type: DataTypes.BOOLEAN,
            field: 'lwf_slab',
            defaultValue: false
        },
        add_lwf_slab: {
            type: DataTypes.BOOLEAN,
            field: 'add_lwf_slab',
            defaultValue: false
        },
        edit_lwf_slab: {
            type: DataTypes.BOOLEAN,
            field: 'edit_lwf_slab',
            defaultValue: false
        },
        delete_lwf_slab: {
            type: DataTypes.BOOLEAN,
            field: 'delete_lwf_slab',
            defaultValue: false
        },
        import_lwf_slab: {
            type: DataTypes.BOOLEAN,
            field: 'import_lwf_slab',
            defaultValue: false
        },
        export_lwf_slab: {
            type: DataTypes.BOOLEAN,
            field: 'export_lwf_slab',
            defaultValue: false
        },
        employee_provident_fund: {
            type: DataTypes.BOOLEAN,
            field: 'employee_provident_fund',
            defaultValue: false
        },
        add_employee_provident_fund: {
            type: DataTypes.BOOLEAN,
            field: 'add_employee_provident_fund',
            defaultValue: false
        },
        edit_employee_provident_fund: {
            type: DataTypes.BOOLEAN,
            field: 'edit_employee_provident_fund',
            defaultValue: false
        },
        delete_employee_provident_fund: {
            type: DataTypes.BOOLEAN,
            field: 'delete_employee_provident_fund',
            defaultValue: false
        },
        import_employee_provident_fund: {
            type: DataTypes.BOOLEAN,
            field: 'import_employee_provident_fund',
            defaultValue: false
        },
        export_employee_provident_fund: {
            type: DataTypes.BOOLEAN,
            field: 'export_employee_provident_fund',
            defaultValue: false
        },
        state_insurance: {
            type: DataTypes.BOOLEAN,
            field: 'state_insurance',
            defaultValue: false
        },
        add_state_insurance: {
            type: DataTypes.BOOLEAN,
            field: 'add_state_insurance',
            defaultValue: false
        },
        edit_state_insurance: {
            type: DataTypes.BOOLEAN,
            field: 'edit_state_insurance',
            defaultValue: false
        },
        delete_state_insurance: {
            type: DataTypes.BOOLEAN,
            field: 'delete_state_insurance',
            defaultValue: false
        },
        import_state_insurance: {
            type: DataTypes.BOOLEAN,
            field: 'import_state_insurance',
            defaultValue: false
        },
        export_state_insurance: {
            type: DataTypes.BOOLEAN,
            field: 'export_state_insurance',
            defaultValue: false
        },
        payroll_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'payroll_configuration',
            defaultValue: false
        },
        edit_payroll_configuration: {
            type: DataTypes.BOOLEAN,
            field: 'edit_payroll_configuration',
            defaultValue: false
        },
        add_leave_track: {
            type: DataTypes.BOOLEAN,
            field: 'add_leave_track',
            defaultValue: false
        },
        edit_leave_track: {
            type: DataTypes.BOOLEAN,
            field: 'edit_leave_track',
            defaultValue: false
        },
        delete_leave_track: {
            type: DataTypes.BOOLEAN,
            field: 'delete_leave_track',
            defaultValue: false
        }
    },
        {
            sequelize,
            tableName: 'employee_access',
            modelName: 'UserAccess',
            timestamps: true
        }
    )

    return UserAccess

}