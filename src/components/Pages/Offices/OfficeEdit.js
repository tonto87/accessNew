import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editOffice } from "../../../store/reducers/officeReducer";
import { toast } from "react-toastify";
import Breadcrumb from "../Breadcrumb";
import { useTranslation } from "react-i18next";

import "./style.scss";

const OfficeEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const office = useSelector((state) =>
    state.offices.find((office) => office.id === id)
  );

  const [formData, setFormData] = React.useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (office) {
      setFormData({
        name: office.name,
        address: office.address,
        phone: office.phone,
      });
    }
  }, [office]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editOffice({ id: office.id, data: formData }));
    toast.success(t("office.edit.success")); // Используем перевод
    navigate("/offices/all");
  };

  if (!office) {
    return <p>{t("office.edit.notFound")}</p>; // Используем перевод
  }

  return (
    <div className="offices-add-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: "/" },
            { label: t("breadcrumb.offices"), to: "/offices/all" },
            { label: t("office.edit.breadcrumb") }, // Используем перевод
          ]}
        />
      </div>
      <hr className="navigation-underline" />
      <h1 className="offices-add">{t("office.edit.title")}</h1> {/* Используем перевод */}
      <form className="offices-add-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">{t("office.edit.officeName")}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">{t("office.edit.address")}</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">{t("office.edit.phone")}</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          {t("office.edit.saveChanges")} {/* Используем перевод */}
        </button>
      </form>
    </div>
  );
};

export default OfficeEdit;
