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

  const [incidents, setIncidents] = useState([
    {
      id: "INC-001",
      title: "API Gateway Down",
      description: "Users receiving 502 errors",
      severity: "Critical",
      status: "open",
      assignee: "Alice",
      createdAt: new Date().toLocaleDateString(),
      service: "Payments API"
    },
    {
      id: "INC-002",
      title: "Login failures",
      description: "OAuth timeout errors",
      severity: "High",
      status: "inProgress",
      assignee: "Bob",
      createdAt: new Date().toLocaleDateString(),
      service: "Auth Service"
    }
  ]);
  const colors = { Critical: "#ef4444", High: "#f97316", Medium: "#eab308" };

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
              display: "flex",
              flexDirection: "column",
              background: "#3966c9",
              borderRadius: "12px",
              padding: "12px",
              overflowY: "auto"
            }}
          >
            <h3>
              {column} :
              {
                incidents.filter((incident) => incident.status === column)
                  .length
              }
            </h3>
            {incidents
              .filter((incident) => incident.status === column)
              .map((incident) => (
                <div
                  key={incident.id}
                  draggable='true'
                  onDragStart={(e) => handleDragStart(e, incident.id)}
                  style={{
                    background: "#1f2937",
                    borderRadius: "10px",
                    padding: "12px",
                    marginBottom: "10px",
                    border: "1px solid #374151",
                    cursor: "grab",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <p>
                    {incident.assignee}: {incident.createdAt}
                  </p>
                  <p>Description: {incident.description}</p>
                  <span
                    style={{
                      padding: "4px 8px",
                      fontWeight: "bold",
                      borderRadius: "999px",
                      background: colors[incident.severity],
                      cursor: "grab"
                    }}
                  >
                    Severity:
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
