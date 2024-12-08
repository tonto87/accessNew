import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  updatePersona,
  updateVisitor,
} from "../../../../store/reducers/visitorReducer";
import Avatar from "../../../../modules/Avatar";

const PersonaAll = () => {
  const visitors = useSelector((state) => state.visitors || []);
  const dispatch = useDispatch();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedVisitorId, setSelectedVisitorId] = useState(null);

  const personNonGrataVisitors = visitors.filter(
    (visitor) => visitor.personNonGrata,
  );

  const handleEdit = (id, currentReason) => {
    setSelectedVisitorId(id);
    setReason(currentReason);
    setIsPopupOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Persona?")) {
      dispatch(updateVisitor({ id, reason: "", personNonGrata: "false" }));
    }
  };

  const handleConfirmEdit = () => {
    dispatch(updatePersona({ id: selectedVisitorId, reason }));
    setIsPopupOpen(false);
    setReason("");
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setReason("");
  };

  return (
    <div className="persona-all-container">
      <h1 className="persona-all-title">
        Personas Marked as &quot;Non Grata&quot;
      </h1>
      {personNonGrataVisitors.length > 0 ? (
        <>
          <Button type="button">
            <Link to="/persona/add">Add Persona</Link>
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Photo</th>
                <th>Fin</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {personNonGrataVisitors.map((visitor, index) => (
                <tr key={visitor.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Avatar
                      size="50px"
                      src={visitor.avatar}
                      alt={visitor.name}
                    />
                  </td>
                  <td>{visitor.name}</td>
                  <td>{visitor.fin}</td>
                  <td>{visitor.reason || "No reason provided"}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(visitor.id, visitor.reason)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(visitor.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p style={{ color: "red", fontStyle: "italic", marginTop: "20px" }}>
            These users are marked as &quot;Person Non Grata.&quot;
          </p>
        </>
      ) : (
        <p className="no-personas">
          No &quot;Person Non Grata&quot; users found.
        </p>
      )}

      {isPopupOpen && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <h2>Provide Reason</h2>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for marking as 'Person Non Grata'"
            style={{
              width: "100%",
              height: "100px",
              marginTop: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              resize: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
              gap: "10px",
            }}
          >
            <Button
              type="button"
              onClick={handleConfirmEdit}
              style={{ padding: "5px 10px" }}
            >
              Confirm
            </Button>
            <button
              onClick={handleCancel}
              className="btn btn-secondary"
              style={{ padding: "5px 10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isPopupOpen && (
        <div
          className="popup-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
          }}
        ></div>
      )}
    </div>
  );
};

export default PersonaAll;
