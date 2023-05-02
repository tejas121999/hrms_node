var cron = require('node-cron');
const db = require('../models');
const { QueryTypes, where } = require('sequelize');
const { Op } = require("sequelize");
const { LeaveConfiguration, User } = require('../models')
const { Employee_Leave } = require('../models')


cron.schedule('* * * * *', async () => {
  // leaveRequestCron()
});
async function leaveRequestCron() {
  try {
    console.log('running a task every minute');
    const owners = await db.sequelize.query("select * from owner", { type: QueryTypes.SELECT })
    owners.forEach(async element => {

      const configuration = await LeaveConfiguration.findOne({
        logging: false,
        where: {
          owner_id: element.id
        }
      })
      // console.log(configuration, "config");
      if (configuration) {

        console.log(element.id, " ", configuration.approval.ac_3, "action", configuration.approval.ac_4, " days", configuration.approval.ac_5)
        if (configuration.approval.ac_3)
          if (configuration.approval.ac_4)
            if (configuration.approval.ac_5) {
              var isApproved = 0;
              if (configuration.approval.ac_4 == "Reject")
                isApproved = 1;
              if (configuration.approval.ac_4 == "Approve")
                isApproved = 2
              const requests = await db.sequelize.query(`select el.*,e.user_owner_id  from employee_leave el left join employees e on e.id=el.emp_id  where el.isApproved = 0 and DATEDIFF(date(now()),date(el.createdAt))>${configuration.approval.ac_5} and e.user_owner_id =${element.id}`, { type: QueryTypes.SELECT })
              requests.forEach(async element => {
                Employee_Leave.update(
                  { isApproved: isApproved },
                  { where: { id: element.id } }
                )
              });
            }
        // console.log("---------")
        // const asd = JSON.stringify(eval(configuration.approval))
        // console.log(asd)
        // console.log(JSON.parse(asd), "approval")
        // if(isJsonString(asd))
        // {
        //   var approval=JSON.parse(asd);
        //   console.log(approval?.ac_3, "approval2");
        // } else {
        //   console.log("NOT VALID")
        // }
      }
      // const requests = await db.sequelize.query(`select el.*,e.user_owner_id  from employee_leave el left join employees e on e.id=el.emp_id  where el.isApproved = 0 and DATEDIFF(date(now()),date(el.createdAt))>5 and e.user_owner_id =${element.id}`, { type: QueryTypes.SELECT })
      // requests.forEach(element => {
      //     console.log(element)
      // });
    });
  }
  catch (e) {
    console.log(e)
  }
}
function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}