import "./FormComponentControlled.css";

import { useState, useReducer } from "react";

const formReducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

export default function FormComponentControlled() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, dispatch] = useReducer(formReducer, {});

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const onInputChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    dispatch({
      name: e.target.name,
      value: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  const formSubmissionData = isSubmitting ? (
    <div className="form-data">
      {Object.entries(formData).map(([name, value], index) => {
        return (
          <p key={index}>
            {name}:{value.toString()}
          </p>
        );
      })}
    </div>
  ) : null;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData["name"] || ""}
              onChange={onInputChange}
            ></input>
          </p>
          <p>
            <label htmlFor="apple">Types</label>
            <select
              name="apple"
              onChange={onInputChange}
              value={formData["apple"] || ""}
            >
              <option value="">Select</option>
              <option value="fuji">Fuji</option>
              <option value="honey-crisp">Honey-Crisp</option>
            </select>
          </p>
          <p>
            <label htmlFor="count">Count</label>
            <input
              type="number"
              name="count"
              onChange={onInputChange}
              value={formData["count"] || ""}
            ></input>
          </p>
          <p>
            <label htmlFor="gift-wrap">Gift Wrap</label>
            <input
              type="checkbox"
              name="gift-wrap"
              checked={formData["gift-wrap"] || false}
              onChange={onInputChange}
            ></input>
          </p>
          <p>
            <label>Color</label>
            <span>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="dark-red"
                  checked={formData["color"] === "dark-red"}
                  onChange={onInputChange}
                ></input>
                Dark Red
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="light-red"
                  checked={formData["color"] === "light-red"}
                  onChange={onInputChange}
                ></input>
                Light Red
              </label>
            </span>
          </p>
        </fieldset>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
      {formSubmissionData}
    </div>
  );
}
