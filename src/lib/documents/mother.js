var mongoose = require('mongoose');

var motherSchema = mongoose.Schema({
  // Contact Information
  firstName: {type: String, required: true},
  nickName: {type: String },
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phone: String,
  // Address Information
  address: {
    line1 : { type: String },
    line2 : { type: String },
    zip : { type: Number },
    city : { type: String },
    state : { type: String }
  },  
  // Children
  children: [ {
    firstName: { type: String, required: true },
    nickName: { type: String },
    lastName: { type: String, required: true },
    gender: Boolean, // Male True - Female False
    birthdate: String,
    receivingServices: Boolean
  }],
  // Documents & Responses Sent/Received Response
  communication: {
    request: {
      sent: Date,
      response: Date
    },
    waiver: {
      sent: Date,
      response: Date
    }
  },
  // Based on ISO-639-2  ( http://www.loc.gov/standards/iso639-2/php/code_list.php )
  languages: [String],
  availability: [Date],
  emergencyContact: {
    firstName: {type: String, required: true},
    nickName: String,
    lastName: {type: String, required: true},
    email: String,
    phone: String
  },
  // Volunteer ID's (e-mail addresses)
  volunteers: [String],
  // Each visit of the family
  visits: [{
    moods: {
      mother: String,
      baby: String,
      siblings: String,
      family: String
    },
    challenges: String,
    volunteers: [String],
    startDate: Date,
    endDate: Date
  }]
});

module.exports = mongoose.model('Mother', motherSchema);