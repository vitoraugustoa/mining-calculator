import React from 'react';

import './container.css';

function Container(props){
  
  return (
    <div class="container">
      {props.children}
    </div>
  );
}

export default Container;