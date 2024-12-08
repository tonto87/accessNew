import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaEdit, FaEye, FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { AppPaths } from "../../../constants/appPaths";
import Avatar from "../../../modules/Avatar";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";
import { useDeleteVisitor, useFetchVisitors } from "../../../hooks/useVisitors";
import { Button } from "react-bootstrap";

const VisitorsAll = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useFetchVisitors();
  const { mutateAsync } = useDeleteVisitor();

  const visitors = data?.data;

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVisitors = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return visitors?.filter(
      (visitor) =>
        visitor.name.toLowerCase().includes(query) ||
        visitor.phone.toLowerCase().includes(query) ||
        visitor.fin.toLowerCase().includes(query),
    );
  }, [searchQuery, visitors]);

  const handleDelete = async (id) => {
    // TODO: Change to Modal (qurban)
    if (window.confirm(t("visitorDeleteConfirm"))) {
      try {
        await mutateAsync(id);
      } catch (error) {
        console.error(t("errorDeletingVisitor"), error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/visitors/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/visitors/view/${id}`);
  };

  const headItems = [
    "#",
    t("fin"),
    t("photo"),
    t("name"),
    t("email"),
    t("phone"),
    t("visitStartDate"),
    t("visitEndDate"),
    t("actions"),
  ];

  const items = filteredVisitors?.map((visitor, index) => ({
    id: visitor.id,
    avatar: <Avatar size="64px" src={visitor.avatar} alt={visitor.name} />,
    fin: visitor.fin,
    name: visitor.name,
    email: visitor.email,
    phone: visitor.phone,
    visitStartDate: format(
      new Date(visitor.visit_start_date * 1000),
      "dd MMM yy HH:mm",
    ),
    visit_end_date: format(
      new Date(visitor.visit_end_date * 1000),
      "dd MMM yy HH:mm",
    ),
  }));

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  if (!visitors || visitors.length === 0) {
    return <p>{t("noVisitorsFound")}</p>; // Display a message when no visitors are found
  }

  return (
    <div className="visitors-all-container">
      <div className="visitors-wrapper d-row d-flex justify-content-between">
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard.home },
            { label: t("breadcrumb.visitors") },
          ]}
        />
        <div className="search-bar">
          <input
            type="text"
            placeholder={t("Search Visitors")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Button variant="primary" className="search">
            <Link to={AppPaths.visitors.add}>{t("Add Visitor")}</Link>
          </Button>
        </div>
      </div>
      <DataTable
        isLoading={isLoading}
        withAction
        headItems={headItems}
        tableProps={{ striped: true, bordered: true, hover: true }}
        items={items}
        actionItems={[
          {
            text: (
              <>
                <FaEye /> {t("view")}
              </>
            ),
            variant: "info",
            onClick: (id) => handleView(id),
          },
          {
            text: <FaEdit />,
            variant: "warning",
            onClick: (id) => handleEdit(id),
          },
          {
            text: <FaRegTrashAlt />,
            variant: "danger",
            onClick: (id) => handleDelete(id),
          },
        ]}
      />
    </div>
  );
};

export default VisitorsAll;
