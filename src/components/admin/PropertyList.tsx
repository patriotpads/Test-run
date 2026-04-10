import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { PropertyItem } from './PropertyItem';

interface PropertyListProps {
  properties: any[];
  onEdit: (property: any) => void;
  onDelete: (property: any) => void;
}

export function PropertyList({ properties, onEdit, onDelete }: PropertyListProps) {
  return (
    <Droppable droppableId="properties">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-4"
        >
          {properties.map((property, index) => (
            <Draggable key={property.id} draggableId={property.id} index={index}>
              {(provided, snapshot) => (
                <PropertyItem
                  property={property}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  dragProps={provided.draggableProps}
                  dragHandleProps={provided.dragHandleProps}
                  ref={provided.innerRef}
                  isDragging={snapshot.isDragging}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
