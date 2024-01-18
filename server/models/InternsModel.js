const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  university: { type: String, required: true },
  major: { type: String, required: true },
  skills: { type: [String], required: true },
  email: { type: String, required: true, unique: true }
});

const Intern = mongoose.model('interns', internSchema);

module.exports = Intern;
