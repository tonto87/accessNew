import { Field, ErrorMessage } from "formik";
import React from "react";

const FormField = ({
  label,
  name,
  type = "text",
  as = "input",
  options = [],
  emptyValue,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    {as === "select" ? (
      <Field as="select" id={name} name={name} className="form-control">
        {emptyValue && (
          <option value="" disabled>
            Select {emptyValue.toLowerCase()}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value || option.name}>
            {option.label || option.name}
          </option>
        ))}
      </Field>
    ) : (
      <Field
        type={type}
        id={name}
        name={name}
        placeholder={`${label.toLowerCase()}`}
        className="form-control"
      />
    )}
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

export default FormField;
