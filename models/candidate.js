const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Candidate extends Model { }

    Candidate.init({
        candidate_number: {
            type: DataTypes.STRING,
            field: 'candidate_number'
        },
        email: {
            type: DataTypes.STRING,
            field: 'email'
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
        mobile_no: {
            type: DataTypes.STRING,
            field: 'mobile_no'
        },
        employee_type:{
            type: DataTypes.STRING,
            field: 'employee_type'
        },
        crew_type:{
            type: DataTypes.STRING,
            field: 'crew_type'
        },
        work_location:{
            type: DataTypes.STRING,
            field: 'work_location'
        },
        company_type:{
            type: DataTypes.STRING,
            field: 'work_location'
        },
        department:{
            type: DataTypes.STRING,
            field: 'department'
        },
        designation:{
            type: DataTypes.STRING,
            field: 'designation'
        },
        manager_name:{
            type: DataTypes.STRING,
            field: 'manager_name'
        },
        employee_status:{
            type: DataTypes.STRING,
            field: 'employee_status'
        },
        employee_classification:{
            type: DataTypes.STRING,
            field: 'employee_classification'
        },
        attendance_code:{
            type: DataTypes.STRING,
            field: 'attendance_code'
        },
        company_name:{
            type: DataTypes.STRING,
            field: 'company_name'
        },

        // work_email_id
        work_email_id: {
            type: DataTypes.STRING,
            field: 'work_email_id'
        },

        date_of_joining:{
            type: DataTypes.DATE,
            field: 'date_of_joining'
        },
        probation_period:{
            type: DataTypes.STRING,
            field: 'probation_period'
        },
        branch:{
            type: DataTypes.STRING,
            field: 'branch'
        },
        remark:{
            type:DataTypes.STRING,
            field:'remark'
        },
        language:{
            type:DataTypes.STRING,
            field:'language'
        },
        personal_date_of_joining:{
            type:DataTypes.DATE,
            field:'personal_date_of_joining'
        },
        marital_status:{
            type:DataTypes.STRING,
            field:'marital_status'
        },
        gender:{
            type:DataTypes.STRING,
            field:'gender'
        },
        email:{
            type:DataTypes.STRING,
            field:'email'
        },
        blood_group:{
            type:DataTypes.STRING,
            field:'blood_group'
        },
        mobile_no:{
            type:DataTypes.STRING,
            field:'mobile_no'
        },
        highest_qualification:{
            type:DataTypes.STRING,
            field:'highest_qualification'
        },
        work_experience:{
            type:DataTypes.STRING,
            field:'work_experience'
        },
        religion:{
            type:DataTypes.STRING,
            field:'religion'
        },
        no_of_dependents:{
            type:DataTypes.STRING,
            field:'no_of_dependents'
        },
        telephone:{
            type:DataTypes.STRING,
            field:'telephone'
        },
        safety_shoes_size:{
            type:DataTypes.STRING,
            field:'safety_shoes_size'
        },
        nearest_domestic_airport: {
            type: DataTypes.STRING,
            field: 'nearest_domestic_airport'
        },
        nearest_internatinal_airport: {
            type: DataTypes.STRING,
            field: 'nearest_internatinal_airport'
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

        experience:{
            type: DataTypes.STRING,
            field: 'experience'
        },
        location:{
            type: DataTypes.STRING,
            field: 'location'
        },
        source_of_hire:{
            type: DataTypes.STRING,
            field: 'source_of_hire'
        },
        skill_set:{
            type: DataTypes.STRING,
            field: 'skill_set'
        },
        current_salary:{
            type: DataTypes.STRING,
            field: 'current_salary'
        },
        upload_offer_letter:{
            type: DataTypes.STRING,
            field: 'upload_offer_letter'
        },

        nominee_name: {
            type: DataTypes.STRING,
            field: 'nominee_name'
        },
        relation_with_employee: {
            type: DataTypes.STRING,
            field: 'relation_with_employee'
        },
        nominee_email: {
            type: DataTypes.STRING,
            field: 'nominee_email'
        },
        nominee_mobile_no: {
            type: DataTypes.STRING,
            field: 'nominee_mobile_no'
        },
        nominee_address: {
            type: DataTypes.STRING,
            field: 'nominee_address'
        },
        nominee_telephone_no: {
            type: DataTypes.STRING,
            field: 'nominee_telephone_no'
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
        candidate_owner_id:{
            type: DataTypes.INTEGER,
            field: 'candidate_owner_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        date_of_birth:{
            type: DataTypes.DATE,
            field: 'date_of_birth'
        },
        Same_as_Temporary: {
            type: DataTypes.BOOLEAN,
            field: 'Same_as_Temporary'
        },
        Same_as_Permanent: {
            type: DataTypes.BOOLEAN,
            field: 'Same_as_Permanent'
        },
        tentative_joining_date:{
            type: DataTypes.DATE,
            field: 'tentative_joining_date'
        },
        isCandidates:{
            type:DataTypes.BOOLEAN,
            field: 'isCandidates',
            defaultValue: false,
        }
    }, {
        sequelize,
        tableName: 'candidates',
        modelName: 'Candidate',
        timestamps: true
    })
    return Candidate
}