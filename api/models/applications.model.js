import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'users', // Reference to the User model
    required: true
  },
  job: {
    type: String,
    ref: 'demoJobs', // Reference to the Job model
    required: true
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },

});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
