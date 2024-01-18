const mongoose = require('mongoose');

const employeeSalarySchema = new mongoose.Schema({
  employeeId: { type: Number, required: true },
  employeeName: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  bonus: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: { type: Number, required: true }
});

const Salary = mongoose.model('salaries', employeeSalarySchema);

module.exports = Salary;
