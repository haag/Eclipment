import React, {useState} from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,

} from '@dnd-kit/sortable';

import {arraySwap} from '../../components/classroom/ArraySwap.ts'
import {SortableItem} from '../../components/classroom/Sortable';
import styles from '../../components/classroom/GridContainer.css';



export default function App() {
  const [items, setItems] = useState([
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
    {id: '7'},
    {id: '8'},
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(({id}) => id)}
        strategy={rectSwappingStrategy}
      >
        <GridContainer columns={5} >
          {items.map(({id}) => (
            <SortableItem
            // {...props}
            key={id} id={id}
            strategy={rectSwappingStrategy}
            reorderItems={arraySwap}
            getNewIndex={({id, items, activeIndex, overIndex}) =>
              arraySwap(items, activeIndex, overIndex).indexOf(id)
            }
          />
          ))}
        </GridContainer>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const {active, over} = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(({id}) => id === active.id);
        const newIndex = items.findIndex(({id}) => id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

function GridContainer({children, columns}) {
  return (
    <div
    // className={styles.GridContainer}
    style={
      {
        display: 'inline-grid',
        '--col-count': columns,
        gridTemplateColumns: 'repeat(4, 1fr)',

      }
    }
    >
      {children}
    </div>
  );
}


// function Grid({children}) {
//   return (
//     <div
//       style={{
//         display: 'inline-grid',
//         gridTemplateColumns: 'repeat(3, 1fr)',
//         gridGap: 20,
//       }}
//     >
//       {children}
//     </div>
//   );
// }
