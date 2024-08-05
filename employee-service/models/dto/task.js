'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
 * This is a method that, using the sequelize Task model, should create and add
 * to the database, a new tasks object/record.
 * @param {Object} body 
 * @returns {Task} Response Object
 */
    async addTask(body) {
      const resData = await Task.create(body)

      if (resData == null || resData == "undefined") {
        return //Error Handling
      }

      return resData.toJSON();
    }

    /**
     * This is a method that, using the sequelize Task model, should get a specified
     * tasks object determined by the tasks id.
     * @param {Number} empid 
     * @returns {Task} Response Object
     */
    async retreiveTask(empid) {
      const resData = await Task.findAll({
        where: {
          employid: empid
        }
      })

      if (resData == null || resData == "undefined") {
        return //Error Handling
      }

      return resData;
    }

    /**
     * This is a method that, using the sequelize Task model, should get a list of
     * tasks objects/records determined by the tasks id.
     * @returns {Task} Response Object
     */
    async retreiveEmployeeList() {
      const resData = await Task.findAll()

      if (resData == null || resData == "undefined") {
        return //Error Handling
      }

      return resData;
    }

    /**
     * This is a method that, using the sequelize Task model, should update a
     * specific tasks object/record determined by the tasks id.
     * @param {Number} empid 
     * @param {Object} body 
     * @returns {Task} Response Object
     */
    async updateTask(empid, body) {
      const resData = await Task.update(
        body,
        {
          where: {
            employid: empid
          }
        }
      )

      if (resData == null || resData == "undefined") {
        return //Error Handling
      }

      return resData;
    }
  }
  Task.init({
    task_no: DataTypes.INTEGER,
    assignee: DataTypes.INTEGER,
    summary: DataTypes.STRING,
    tags: DataTypes.STRING,
    body: DataTypes.TEXT,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    status: DataTypes.TINYINT,
    createat: DataTypes.DATE,
    updateat: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};