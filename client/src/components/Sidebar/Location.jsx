import React from "react";
import InputField from "../InputField";

function Location({ handleChange }) {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="location"
            id="location"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>All
        </label>

        <InputField
          handleChange={handleChange}
          value="london"
          title="London"
          name="location"
        />

        <InputField
          handleChange={handleChange}
          value="seattle"
          title="Seattle"
          name="location"
        />

        <InputField
          handleChange={handleChange}
          value="madrid"
          title="Madrid"
          name="location"
        />

        <InputField
          handleChange={handleChange}
          value="boston"
          title="Boston"
          name="location"
        />
      </div>
    </div>
  );
}

export default Location;
