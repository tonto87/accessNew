import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchComplaints } from "../../../hooks/useComplaints";

import { AppPaths } from "../../../constants/appPaths";
import Breadcrumb from "../Breadcrumb";
import Avatar from "../../../modules/Avatar";
import ReportModal from "./VisitorsModal/ReportModal";
import "./Style_visitor_view/view.scss";

const VisitorsView = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: complaints, isLoading: complaintsLoading } =
    useFetchComplaints();

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  const visitor = useSelector(
    (state) =>
      state.visitors.data.find(
        (visitor) => visitor.id.toString() === id.toString(),
      ),
    shallowEqual,
  );

  if (!visitor) {
    return <div>{t("loading")}</div>;
  }

  const toggleReportModal = () => setIsReportOpen((prev) => !prev);

  const handleBlockUser = () => {
    setIsBlocked(true);
  };

  const handleSubmitReport = () => {
    console.log(`Report submitted: ${description}`);
    setIsReportOpen(false);
  };

  return (
    <div className="visitor-view-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: t("breadcrumb.dashboard"), to: AppPaths.dashboard.home },
            { label: t("breadcrumb.visitors"), to: AppPaths.visitors.all },
            { label: t("visitorView.viewVisitor") },
          ]}
        />
      </div>
      <div className="visitor-view-card">
        <div className="visitor-photo">
          <Avatar size="128px" src={visitor.avatar} alt={visitor.name} />
        </div>
        <button
          onClick={handleBlockUser}
          className={`icon-btn ${isBlocked ? "blocked" : ""}`}
        >
          {isBlocked ? t("visitorView.blocked") : t("visitorView.block")}
        </button>
        <ReportModal
          onClose={toggleReportModal}
          description={description}
          setDescription={setDescription}
          id={visitor.id}
        />
        <div className="visitor-info">
          <p>
            <strong>{t("name")}:</strong> {visitor.name}
          </p>
          <p>
            <strong>{t("phone")}:</strong> {visitor.phone}
          </p>
          <p>
            <strong>{t("fin")}:</strong> {visitor.fin}
          </p>
          <p>
            <strong>{t("email")}:</strong> {visitor.email}
          </p>
          <p>
            <strong>{t("address")}:</strong> {visitor.address}
          </p>
        </div>
        <div className="modal-actions"></div>
      </div>
    </div>
  );
};

export default VisitorsView;
