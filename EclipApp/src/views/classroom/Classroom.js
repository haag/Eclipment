import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,
  arraySwap
} from '@dnd-kit/sortable';

import { Sortable } from '../../components/classroom/Sortable';
import { GridContainer } from '../../components/classroom/GridContainer.jsx';
import Item from '../../components/classroom/Item.jsx'

import UserList from '../../data/users/dummyUserData';

export default function App() {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState([
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
    {id: '7'},
    {id: '8'},
    {id: '9'},
    {id: '10'},
    {id: '11'},
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      items={items.map(({id}) => id)}
    >
      <SortableContext
        items={items}
        strategy={rectSwappingStrategy}
      >
        <GridContainer columns={4} >

          {items.map(({id}) =>
            <Sortable
              id={id}
              key={id}
              strategy={rectSwappingStrategy}
            />)}
        </GridContainer>
      </SortableContext>
      <DragOverlay>
        {activeId ? <Item 
          id={activeId} 
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "red"
          }}
        /> : null}
      </DragOverlay>
    </DndContext>
  );


  function handleDragStart(event) {
    const {active} = event;
    console.log("DragStart Active:", active)
    setActiveId(active.id);
  }


  function handleDragEnd(event) {
    const { active, over } = event;
    console.log("DragEnd OVER:", over)

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.map(p => p.id).indexOf(active.id);
        const newIndex = items.map(p => p.id).indexOf(over.id);
        return arraySwap(items, oldIndex, newIndex);
      })
      
    }
    setActiveId(null);
  }
}

