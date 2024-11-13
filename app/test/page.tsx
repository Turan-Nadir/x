"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function MyComponent() {
  const [items, setItems] = useState([
    { name: "Item 1", detail: "qwerty" },
    { name: "Item 2", detail: "olgae" },
    { name: "Item 3", detail: "dewidol" },
  ]);

  const onDragEnd = (result:any) => {
    const { source, destination } = result;

    // If dropped outside the list
    if (!destination) return;

    // If the item is dropped in the same position
    if (source.index === destination.index) return;

    // Create a copy of the items array
    const updatedItems = [...items];

    // Remove the dragged item from its original position
    const [removed] = updatedItems.splice(source.index, 1);

    // Insert the dragged item into its new position
    updatedItems.splice(destination.index, 0, removed);

    // Update the state with the new items order
    setItems(updatedItems);
    console.log(items);
  };


  return (
    <div style={{ width: "300px", margin: "0 auto", paddingTop: "20px" }}>
      <h3>Drag and Drop List with Details</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.name}
                  draggableId={item.name}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: "10px",
                        margin: "5px 0",
                        borderRadius: "4px",
                        backgroundColor: snapshot.isDragging
                          ? "#e0e0e0"
                          : "#ffffff",
                        boxShadow: snapshot.isDragging
                          ? "0 2px 5px rgba(0, 0, 0, 0.2)"
                          : "none",
                        border: "1px solid #ddd",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <strong>{item.name}</strong>
                      <p style={{ margin: 0, color: "#555" }}>{item.detail}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default MyComponent;
