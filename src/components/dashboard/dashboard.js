import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./dashboardStyle.scss";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: offices } = useSelector((state) => state.offices) || [];
  const departments =
    useSelector((state) => state.departments.departmentsData) || [];
  const visitors = useSelector((state) => state.visitors) || []; // Ensure it's an array

  const sortedOffices = [...offices].sort((a, b) => b.id - a.id).slice(-3);
  const sortedDepartments = [...departments]
    .sort((a, b) => b.id - a.id)
    .slice(-3);
  const sortedVisitors = [...visitors.data]
    .sort((a, b) => b.id - a.id)
    .slice(-3);

  const handleViewAll = (path) => navigate(path);

  console.log({
    sortedVisitors,
  });

  return (
    <Container fluid>
      {/* Visitors Section */}
      <Section
        title="Visitors Overview"
        data={sortedVisitors}
        fields={["fin", "name", "phone", "email", "address"]}
        headers={["#", "Fin", "Name", "Phone", "Email", "Address"]}
        noDataMessage="No visitors available"
        onViewAll={() => handleViewAll("/visitors/all")}
      />

      {/* Offices Section */}
      <Section
        title="Offices Overview"
        data={sortedOffices}
        fields={["name", "address", "phone"]}
        headers={["#", "Office Name", "Address", "Phone Number"]}
        noDataMessage="No offices available"
        onViewAll={() => handleViewAll("/offices/all")}
      />

      {/* Departments Section */}
      <Section
        title="Departments Overview"
        data={sortedDepartments}
        fields={["name", "phone", "office"]}
        headers={["#", "Department Name", "Phone", "Office"]}
        noDataMessage="No departments available"
        onViewAll={() => handleViewAll("/departments/list")}
      />
    </Container>
  );
};

// Reusable Section Component
const Section = ({
  title,
  data,
  headers,
  fields,
  noDataMessage,
  onViewAll,
}) => (
  <div className="dashboard-section">
    <div className="section-header">
      <h4>{title}</h4>
      <Button variant="primary p-1 " onClick={onViewAll}>
        Open Full List
      </Button>
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{renderTableRows(data, fields, noDataMessage)}</tbody>
    </Table>
  </div>
);

// Helper to render table rows
const renderTableRows = (data, fields, noDataMessage) => {
  if (data.length === 0) {
    return (
      <tr>
        <td colSpan={fields.length}>{noDataMessage}</td>
      </tr>
    );
  }
  return data.map((item, index) => (
    <tr key={item.id || index}>
      <td>{index + 1}</td>
      {fields.map((field, fieldIndex) => (
        <td key={fieldIndex}>{item[field]}</td>
      ))}
    </tr>
  ));
};

export default Dashboard;
