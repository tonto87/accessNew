import React from "react";
import Modal from "../../../../modules/Modal";
import { useTranslation } from "react-i18next";

const ShowMoreModal = ({
  onClose,
  onBlock,
  isBlocked,
  onReport,
  complaints = [],
}) => {
  const { t } = useTranslation();

  return (
    <Modal btnText={t("visitorView.showMore")} onClose={onClose}>
      <h4>{t("visitorView.showMore")}</h4>
      <div className="modal-actions">
        <button
          onClick={onBlock}
          className={`icon-btn ${isBlocked ? "blocked" : ""} `}
        >
          {isBlocked ? t("visitorView.blocked") : t("visitorView.block")}
        </button>
        <button onClick={onReport} className="report-btn">
          {t("visitorView.report")}
        </button>
      </div>

      {complaints.length > 0 && (
        <div className="complaints-list">
          <h5>{t("visitorView.previousReports")}</h5>
          <ul>
            {complaints.map((complaint, index) => (
              <li key={index}>{complaint}</li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  );
};

export default ShowMoreModal;
