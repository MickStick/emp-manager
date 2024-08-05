require('dotenv').config();

var database = require('../../../config/database');
const {EmployeeService} = require('../../../services');
const Sequelize = require('sequelize');
const Employee = require("'../../../models/employee");
const EmployeeReview = require("'../../../models/employeereviews");
const EmployeeAgreement = require("'../../../models/employeeagreement");
const {expect} = require('@jest/globals')
const Log = require('../../../utility/Log');
let {faker} = require("@faker-js/faker");

describe("Employee Data Tests", () => {

   var empService = new EmployeeService(
      Employee(database, Sequelize.DataTypes), 
      EmployeeReview(database, Sequelize.DataTypes), 
      EmployeeAgreement(database, Sequelize.DataTypes)
   );

   // before(() => {
   //    // database.authenticate().then(() => {
   //    //    Log.success('Connection has been established successfully.');
   //    // }).catch((error) => {
   //    //    Log.error('Unable to connect to the database: ' + JSON.stringify(error));
   //    // });
   // })

   // after(() => {
   //    // database.close().then(() => {
   //    //    Log.inform("Closed database connection!");
   //    // })
   // })

   const formatFakeDate = (dateStr) => {
      // let strDate = dateStr.toString().split("T")[0];
      // let strDateArr = strDate.split("-");

      return `${dateStr.getMonth()}/${dateStr.getDate()}/${dateStr.getFullYear()}`
   }

   it('Should Add a fake Employee', async () => {
      let employee = {
         firstname: faker.person.firstName(),
         lastname: faker.person.lastName(),
         dob: formatFakeDate(faker.date.birthdate({min: 25, max:40, mode: 'age'})),
         doe: formatFakeDate(faker.date.birthdate({min: 2015, max:2022, mode: 'year'})),
         dot: "",
         employid: faker.number.int({min: 10010, max: 15000}),
         depid: faker.number.int({min: 1001, max: 1500}),
         jobtitle: faker.number.int({min: 1001, max: 1500}),
         accesslvl: "staff",
         rate: "monthly",
         compensate: faker.number.int({min: 1000000, max: 1500000})
      }

      let response = await empService.addEmployeeData(employee);
      Log.inform("Response here: " + JSON.stringify(response))
      database.close()
   })
   
   it('Should retrieve Employee record', async () => {
      let response = await empService.retreiveEmployeeData(10987)
      Log.inform("response: " + JSON.stringify(response));
      
      expect(typeof response == "object").toBe(true)

      database.close();
   })
})