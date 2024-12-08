import React, { useState, useMemo } from "react";
import { Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AddModal from "./AddModal";
import DataTable from "../../../../modules/DataTable";
import { updateVisitor } from "../../../../store/reducers/visitorReducer";

import "./style.scss";

const PersonaAdd = () => {
  const [inputValue, setInputValue] = useState("");
  const [reason, setReason] = useState("");
  // const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const visitors = useSelector((state) =>
    state.visitors.filter((v) => !v.personNonGrata),
  );

  const matchedVisitors = useMemo(() => {
    return visitors.filter((visitor) =>
      visitor.name.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [inputValue, visitors]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirmAdd = (id) => {
    if (!reason.trim()) {
      setError("Please provide a reason.");
      return;
    }

    try {
      dispatch(
        updateVisitor({
          id,
          personNonGrata: true,
          reason: reason.trim(),
        }),
      );

      setInputValue("");
      setReason("");
      setError(""); // Clear error after successful update
    } catch (error) {
      setError("Failed to update. Please try again.");
      console.log(error);
    }
  };

  const headItems = ["ID", "Name", "Phone", "Fin", "Actions"];

  const items = matchedVisitors.map((visitor) => ({
    id: visitor.id,
    name: visitor.name,
    phone: visitor.phone,
    fin: visitor.fin,
    action: (
      <AddModal
        onChange={(e) => setReason(e.target.value)}
        reason={reason}
        onConfirm={() => handleConfirmAdd(visitor.id)}
        // onCancel={() => (null)}
      />
    ),
  }));

  return (
    <div className="persona-add-container">
      <Form>
        <Form.Group controlId="searchVisitor">
          <Form.Label>Search Visitor</Form.Label>
          <Form.Control
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search by name"
          />
        </Form.Group>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Display matched visitors as a DataTable */}
      <DataTable
        withAction
        headItems={headItems}
        tableProps={{ striped: true, bordered: true, hover: true }}
        items={items}
      />

      {/* {selectedVisitor && (
        
      )} */}
    </div>
  );
};

export default PersonaAdd;
