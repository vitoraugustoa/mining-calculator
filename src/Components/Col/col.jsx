import React, { useState, useEffect } from 'react';

import './col.css';

function Col(props) {
  const [colSize, setColSize] = useState("12");

  useEffect(() => {
    if(props.col)
      setColSize(props.Col);
    else
      setColSize("12");
  }, []);

  return (
    <div class={`col-${colSize}`}>
      {props.children}
    </div>
  );
}

export default Col;