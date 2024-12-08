import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editDepartment } from "../../../store/reducers/departmentReducer";
import Breadcrumb from "../Breadcrumb";
import "./style.scss";

const DepartmentEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: offices } = useSelector((state) => state.offices);

  const department = useSelector((state) =>
    state.departments.departmentsData.find(
      (department) => department.id === id,
    ),
  );

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    office: "",
  });

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        phone: department.phone,
        office: department.office,
      });
    } else {
      navigate("/departments/all");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editDepartment({ id: department.id, data: formData }));
    toast.success("Department successfully edited");
    navigate("/departments/all");
  };

  if (!department) {
    return <p>Department not found</p>;
  }

  return (
    <div className="department-add-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: "Dashboard", to: "/" },
            { label: "Departments", to: "/departments/list" },
            { label: "Department - Edit" },
          ]}
        />
      </div>
      <hr className="navigation-underline" />
      <h1 className="department-add">Edit Department</h1>
      <form className="department-add-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Department Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="office">Office</label>
          <select
            name="office"
            value={formData.office}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select office
            </option>
            {offices.map((office) => (
              <option key={office.id} value={office.name}>
                {office.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default DepartmentEdit;
