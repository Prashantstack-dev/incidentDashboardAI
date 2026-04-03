
const KanbanBoard = ({geojsonData }) => {
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

const handleDrop = async (e, column) => {
  e.preventDefault();
  const droppedId = e.dataTransfer.getData("text/plain");

   //Save previous state
  // const previousIncidents = [...incidents];

  // // Optimistically update UI
  // const updatedIncidents = incidents.map((feature) =>
  //   feature.id === droppedId ? { ...feature, status: column } : feature
  // );
  // setIncidents(updatedIncidents);

  // try {
  //   // Simulate async server update (replace with real API call)
  //   const response = await fetch(`http://localhost:3000/api/incidents/${droppedId}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ status: column }),
  //   });

  //   if (!response.ok) throw new Error("Server update failed");

  //   //  Optionally update state with server response
  //   const serverData = await response.json();
  //   setIncidents((prev) =>
  //     prev.map((feature) =>
  //       feature.id === droppedId ? { ...feature, ...serverData } : feature
  //     )
  //   );
  // } catch (error) {
  //   console.error(error);
  //   //  Rollback UI if server update fails
  //   setIncidents(previousIncidents);
  //   alert("Failed to move feature. Please try again.");
  // }
};


  // const colors = { Critical: "#ef4444", High: "#f97316", Medium: "#eab308" };

  const columns = ["Emergency Warning", "Watch and Act", "Advice", "Not Applicable"]
  if (!geojsonData) return <p>Loading incidents...</p>
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
              overflowY: "auto",
              maxHeight: "400px"
            }}
          >
            <h3>
              {column} :
              {
                geojsonData.features.filter((feature) => feature.properties.category === column)
                  .length
              }
            </h3>
            {geojsonData.features
              .filter((feature) => feature.properties.category === column)
              .map((feature) => (
                <div
                  key={feature.properties.guid}
                  draggable='true'
                  onDragStart={(e) => handleDragStart(e, feature.properties.title)}
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
                    {feature.properties.title}: {feature.properties.link}
                  </p>
                  <p>Description: {feature.properties.description}</p>
                  <span
                    style={{
                      padding: "4px 8px",
                      fontWeight: "bold",
                      borderRadius: "999px",
                      // background: colors[feature.severity],
                      cursor: "grab"
                    }}
                  >
                    Severity:
                    {feature.severity}
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

