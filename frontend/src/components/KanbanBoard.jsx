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
  const colors = { Critical: "red", High: "orange", Medium: "yellow" };

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
              border: "1px solid black",
              backgroundColor: "#cfb8b8", 
              padding: "1rem",
              cursor: "grab"
            }}
          >
            <h3>{column}: {incidents.filter(incident => incident.status === column).length}</h3>
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
                  </p>
                  <p>Description: {incident.description}</p>
                  <span
                    style={{
                      padding: "8px",
                      margin: "8px 0",
                      background: colors[incident.severity],
                      cursor: "grab"
                    }}
                  >Severity: 
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
