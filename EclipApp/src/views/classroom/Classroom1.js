import React, {useMemo, useState} from 'react';
import {
  DndContext,
  useDraggable,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  Translate,
  PointerActivationConstraint,
  Modifiers,
  useSensors,
} from '@dnd-kit/core';
import {
  createSnapModifier,
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
  restrictToWindowEdges,
  snapCenterToCursor,
} from '@dnd-kit/modifiers';

import {
  Axis,
  Draggable,
//   Grid,
//   OverflowWrapper,
  Wrapper,
} from '../../components';


const defaultCoordinates = {
  x: 0,
  y: 0,
};


function DraggableStory({
  activationConstraint,
  axis,
  handle,
  label = 'Go ahead, drag me.',
  modifiers,
  style,
}) {
  const [{translate}, setTranslate] = useState({
    initialTranslate: Translate,
    translate: Translate
  })({initialTranslate: defaultCoordinates, translate: defaultCoordinates});
  const [initialWindowScroll, setInitialWindowScroll] = useState(
    defaultCoordinates
  );
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint,
  });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={() => {
        setInitialWindowScroll({
          x: window.scrollX,
          y: window.scrollY,
        });
      }}
      onDragMove={({delta}) => {
        setTranslate(({initialTranslate}) => ({
          initialTranslate,
          translate: {
            x: initialTranslate.x + delta.x - initialWindowScroll.x,
            y: initialTranslate.y + delta.y - initialWindowScroll.y,
          },
        }));
      }}
      onDragEnd={() => {
        setTranslate(({translate}) => {
          return {
            translate,
            initialTranslate: translate,
          };
        });
        setInitialWindowScroll(defaultCoordinates);
      }}
      onDragCancel={() => {
        setTranslate(({initialTranslate}) => ({
          translate: initialTranslate,
          initialTranslate,
        }));
        setInitialWindowScroll(defaultCoordinates);
      }}
      modifiers={modifiers}
    >
      <Wrapper>
        <DraggableItem
          axis={axis}
          label={label}
          handle={handle}
          style={style}
          translate={translate}
        />
      </Wrapper>
    </DndContext>
  );
}


function DraggableItem({
  axis,
  label,
  style,
  translate,
  handle,
}) {
  const {attributes, isDragging, listeners, setNodeRef} = useDraggable({
    id: 'draggable',
  });

  return (
    <Draggable
      ref={setNodeRef}
      dragging={isDragging}
      handle={handle}
      label={label}
      listeners={listeners}
      style={style}
      translate={translate}
      axis={axis}
      {...attributes}
    />
  );
}

export const BasicSetup = () => <DraggableStory />;

export const DragHandle = () => (
  <DraggableStory label="Drag with the handle" handle />
);

export const PressDelay = () => (
  <DraggableStory
    label="Hold me to drag"
    activationConstraint={{
      delay: 250,
      tolerance: 5,
    }}
  />
);

export const MinimumDistance = () => (
  <DraggableStory
    label="I'm activated after dragging 15px"
    activationConstraint={{
      distance: 15,
    }}
  />
);

export const MinimumDistanceX = () => (
  <DraggableStory
    label="I'm activated after dragging 15px on the x axis"
    activationConstraint={{
      distance: {x: 15},
    }}
  />
);

MinimumDistanceX.storyName = 'Minimum Distance – X Axis';

export const MinimumDistanceY = () => (
  <DraggableStory
    label="I'm activated after dragging 15px on the y axis"
    activationConstraint={{
      distance: {y: 15},
    }}
  />
);

MinimumDistanceY.storyName = 'Minimum Distance – Y Axis';

export const MinimumDistanceXY = () => (
  <DraggableStory
    label="I'm activated after dragging 15px on the x and y axis"
    activationConstraint={{
      distance: {x: 15, y: 15},
    }}
  />
);

MinimumDistanceXY.storyName = 'Minimum Distance – X&Y Axis';

export const MinimumDistanceXToleranceY = () => (
  <DraggableStory
    label="I'm activated after dragging 15px on the x axis and aborted after dragging 30px on the y axis"
    activationConstraint={{
      distance: {x: 15},
      tolerance: {y: 30},
    }}
  />
);

MinimumDistanceXToleranceY.storyName = 'Minimum Distance X Axis and Tolerance Y Axis';

export const MinimumDistanceYToleranceX = () => (
  <DraggableStory
    label="I'm activated after dragging 15px on the y axis and aborted after dragging 30px on the x axis"
    activationConstraint={{
      distance: {y: 15},
      tolerance: {x: 30},
    }}
  />
);

MinimumDistanceYToleranceX.storyName = 'Minimum Distance Y Axis and Tolerance X Axis';

export const HorizontalAxis = () => (
  <DraggableStory
    label="Draggable horizontally"
    axis={Axis.Horizontal}
    modifiers={[restrictToHorizontalAxis]}
  />
);

export const VerticalAxis = () => (
  <DraggableStory
    label="Draggable vertically"
    axis={Axis.Vertical}
    modifiers={[restrictToVerticalAxis]}
  />
);

export const RestrictToWindowEdges = () => (
  <OverflowWrapper>
    <DraggableStory
      label="I'm only draggable within the window bounds"
      modifiers={[restrictToWindowEdges]}
    />
  </OverflowWrapper>
);

export const SnapToGrid = () => {
  const [gridSize, setGridSize] = React.useState(30);
  const itemStyle = {
    marginTop: 11,
    marginLeft: 11,
    width: gridSize * 8 - 1,
    height: gridSize * 2 - 1,
  };
  const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

  return (
    <>
      <DraggableStory
        label={`Snapping to ${gridSize}px increments`}
        modifiers={[snapToGrid]}
        style={itemStyle}
        key={gridSize}
      />
      <Grid size={gridSize} onSizeChange={setGridSize} />
    </>
  );
};

export const SnapCenterToCursor = () => (
  <DraggableStory
    label="When you grab me, my center will move to where the cursor is."
    modifiers={[snapCenterToCursor]}
  ></DraggableStory>
);