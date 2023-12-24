import React from 'react'
import InputField from '../InputField'

function WorkExperience({handleChange}) {
  return (
    <div>
    <h4 className="text-lg font-medium mb-2">Work Experience</h4>

    <div>
      <label className="sidebar-label-container">
        <input
          type="radio"
          name="workExperience"
          id="workExperience"
          value=""
          onChange={handleChange}
        />
        <span className="checkmark"></span>All
      </label>

      <InputField
        handleChange={handleChange}
        value="internship"
        title="Internship"
        name="workExperience"
      />

      <InputField
        handleChange={handleChange}
        value="work remotely"
        title="Work remotely"
        name="workExperience"
      />

      
    </div>
  </div>
  )
}

export default WorkExperience
