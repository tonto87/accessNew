import React from "react";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFetchComplaints } from "../../../hooks/useComplaints";
import DataTable from "../../../modules/DataTable";
import Breadcrumb from "../Breadcrumb";

const ComplaintsAll = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useFetchComplaints();
  const navigate = useNavigate();

  const complaints = data?.data;
  console.log(complaints);

  const handleView = (id) => {
    const complaint = complaints.find((c) => c.id === id);
    console.log(complaint);
    navigate(`/visitors/view/${complaint.visitor_id}`);
  };

  if (isLoading) return <p>{t("loading")}</p>;
  if (!complaints?.length) return <p>{t("no Complaints found")}</p>;

  const headItems = [
    t("#"),
    t("visitorComplaint.photo"), // "Photo"
    t("visitorComplaint.name"), // "Name"
    t("visitorComplaint.date"), // "Date"
    t("visitorComplaint.description"), // "Description"
    t("visitorComplaint.profile"),
  ];

  const items = complaints?.map((complaint, index) => ({
    id: complaint.id,
    avatar: complaint.avatar,
    name: complaint.visitor,
    date: new Date(complaint.created_at).toLocaleDateString(),
    description: complaint.description,
  }));

  return (
    <div className="complaints-all-container">
      <Breadcrumb
        paths={[
          { label: t("breadcrumb.dashboard"), to: "/dashboard" },
          { label: t("breadcrumb.visitorComplaint") },
        ]}
      />
      <DataTable
        isLoading={isLoading}
        headItems={headItems}
        items={items}
        actionItems={[{ text: <FaEye />, onClick: (id) => handleView(id) }]}
      />
    </div>
  );
};

export default ComplaintsAll;
