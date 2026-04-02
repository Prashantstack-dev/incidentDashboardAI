//to understand how draganddrop works took reference of the code below:

const DragDrop = () => {
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData("text/plain");
    console.log("Dropped ID:", droppedId);
  };
  return <>
  <div draggable="true" onDragStart={(e) => handleDragStart(e, "item-1")}>
        Drag Me
      </div>
      <div onDragOver={handleDragOver} onDrop={handleDrop} style={{border: '1px solid black', height: '100px'}}>
        Drop Zone
      </div>
  
  </>;
};

export default DragDrop;
