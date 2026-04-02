import { useState } from "react";

const KanbanBoard = () => {
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, column) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData("text/plain");
    console.log("Dropped ID:", droppedId);
    const actualDrop = incidents.map((incident) => {
      if (incident.id === droppedId) {
        return { ...incident, status: column };
      } else {
        return incident;
      }
    });
    setIncidents(actualDrop);
  };

  //     const [incidents, setIncidents] = useState([
  //   { id: "INC-001", title: "Server down", severity: "critical", status: "open" },
  //   { id: "INC-002", title: "Login failing", severity: "high", status: "inProgress" },
  //   { id: "INC-003", title: "CPU spike", severity: "medium", status: "resolved" },
  //   { id: "INC-004", title: "Memory leak", severity: "high", status: "open" },
  // ])

  const [incidents, setIncidents] = useState([
    {
      id: "INC-001",
      title: "API Gateway Down",
      description: "Users receiving 502 errors",
      severity: "critical",
      status: "open",
      assignee: "Alice",
      createdAt: Date.now().toString(),
      service: "Payments API"
    },
    {
      id: "INC-002",
      title: "Login failures",
      description: "OAuth timeout errors",
      severity: "high",
      status: "inProgress",
      assignee: "Bob",
      createdAt: "2026-04-01T11:30:00Z",
      service: "Auth Service"
    }
  ]);
  const colors = { critical: "red", high: "orange", medium: "yellow" };

  const columns = ["open", "inProgress", "resolved"];

  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        {columns.map((column) => (
          <div
            key={column}
            onDragOver={(e) => handleDragOver(e, column)}
            onDrop={(e) => handleDrop(e, column)}
            style={{
              flex: 1,
              border: "1px solid ",
              padding: "1rem",
              cursor: "grab"
            }}
          >
            <h3>{column}</h3>
            {incidents
              .filter((incident) => incident.status === column)
              .map((incident) => (
                <div
                  key={incident.id}
                  draggable='true'
                  onDragStart={(e) => handleDragStart(e, incident.id)}
                >
                  <p>
                    {incident.assignee}: {incident.createdAt}
                    {incident.description}
                  </p>
                  <span
                    style={{
                      padding: "8px",
                      margin: "8px 0",
                      background: colors[incident.severity] || "#866767",
                      cursor: "grab"
                    }}
                  >
                    {incident.severity}
                  </span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default KanbanBoard;
