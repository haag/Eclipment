import React, {forwardRef} from 'react';

const Item = forwardRef(({id, ...props}, ref) => {
  return (
    <div {...props} style={props.style} ref={ref}>
        {id}
    </div>
  )
});

export default Item
