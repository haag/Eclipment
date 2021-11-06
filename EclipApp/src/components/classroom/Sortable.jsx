import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import Item from './Item';

export function Sortable(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 100,
    height: 100,
    padding: 20,
    border: '2px solid',
  };
  return (
    <Item ref={setNodeRef} style={style} {...attributes} {...listeners} {...props}> </Item>
  );
}

