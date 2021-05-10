import React from 'react';

import './row.css';

function Row(props) {

  return (
    <div class="row">
      {props.children}
    </div>
  );
}

export default Row;