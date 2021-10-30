import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from '../../components/classroom/Droppable';
import {Draggable} from '../../components/classroom/Draggable';

function Classroom() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
        Hello
      {!isDropped ? draggableMarkup : null}
      <Droppable>
        {isDropped ? draggableMarkup : 'Drop here'}
      </Droppable>
    </DndContext>
  );
  
  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }
}

export default Classroom