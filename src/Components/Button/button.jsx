import React from 'react';

import './button.css'

function Button(props) {
  return (
    <button type="button" onClick={props.onClick} class={`btn btn-${props.color}`}>
      {props.children}
    </button>
  );
}

export default Button;