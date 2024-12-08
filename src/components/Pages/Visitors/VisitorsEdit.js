import { Formik, Field, Form as FormikForm } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppPaths } from "../../../constants/appPaths";
import { editVisitor } from "../../../store/reducers/visitorReducer";
import Breadcrumb from "../Breadcrumb";

import "./style.scss";
import { VisitorValidationSchema } from "../InputValidation";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  useFetchVisitorById,
  useUpdateVisitor,
} from "../../../hooks/useVisitors";
import LoadingForm from "../../../modules/Loading/Form";

const VisitorsEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading } = useFetchVisitorById(id);
  const visitor = data?.data;
  const [items, setItems] = useState(visitor?.items || []);
  const { mutateAsync } = useUpdateVisitor();

  useEffect(() => {
    if (visitor) {
      setItems(visitor.items);
    }
  }, [visitor]);

  const handleAddItem = () => {
    setItems([...items, { name: "", desc: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await mutateAsync({ id: visitor.id, visitor: values });
      dispatch(editVisitor({ id: visitor.id, data: values }));
      setSubmitting(false);
      toast.success(t("visitor.add.success"));
      navigate(AppPaths.visitors.view.replace(":id", visitor.id));
    } catch (error) {
      toast.error(t("visitor.add.error"));
      console.error(t("errorAddingVisitor"), error);
    }
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  return (
    <div className="visitor-add-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard.home },
            { label: t("breadcrumb.visitors"), to: AppPaths.visitors.all },
            { label: t("breadcrumb.addVisitor") },
          ]}
        />
      </div>
      <h1 className="visitor-add-title">{t("visitor.edit.title")}</h1>
      <Formik
        initialValues={{
          fin: visitor.fin,
          name: visitor.name,
          phone: visitor.phone,
          email: visitor.email,
          address: visitor.address,
        }}
        validationSchema={VisitorValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, errors, values }) => (
          <FormikForm className="form-container">
            {Object.keys(errors).length > 0 && (
              <div className="error">{Object.values(errors).join(", ")}</div>
            )}
            <Field
              type="text"
              name="fin"
              placeholder={t("visitor.add.enterFin")}
              className="form-control"
              value={values.fin}
              onChange={(e) => setFieldValue("fin", e.target.value)}
            />

            <Field
              type="text"
              name="name"
              placeholder={t("visitor.add.enterName")}
              className="form-control"
              value={values.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
            />
            <Field
              type="tel"
              name="phone"
              placeholder={t("visitor.add.enterPhone")}
              className="form-control"
              value={values.phone}
              onChange={(e) => setFieldValue("phone", e.target.value)}
            />

            <Field
              type="email"
              name="email"
              placeholder={t("visitor.add.enterEmail")}
              className="form-control"
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
            />

            <Field
              type="text"
              name="address"
              placeholder={t("visitor.add.enterAddress")}
              className="form-control"
              value={values.address}
              onChange={(e) => setFieldValue("address", e.target.value)}
            />

            <Row className="mb-3">
              <Button variant="warning" onClick={handleAddItem}>
                {t("visitorAdd.addItem")}
              </Button>
            </Row>
            {items?.length > 0 && (
              <Table bordered className="mb-3">
                <thead>
                  <tr>
                    <th>{t("visitorAdd.itemName")}</th>
                    <th>{t("visitorAdd.itemDescription")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Field
                          type="text"
                          placeholder={t("visitorAdd.itemName")}
                          value={item.name}
                          onChange={(e) =>
                            handleItemChange(index, "name", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Field
                          type="text"
                          placeholder={t("visitorAdd.itemDescription")}
                          value={item.desc}
                          onChange={(e) =>
                            handleItemChange(index, "desc", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <FaRegTrashAlt />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? t("visitor.add.submitting")
                : t("visitor.add.submit")}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default VisitorsEdit;
