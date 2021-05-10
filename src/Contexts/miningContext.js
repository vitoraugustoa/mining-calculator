import React, { useState ,createContext } from 'react';

export const MiningContext = createContext([]);

function Contexts(props) {
  const [componentsSelecteds, setComponentsSelecteds] = useState([]);

  function saveComponents(components) {
    setComponentsSelecteds(components);
  }

  function clearComponents() {
    setComponentsSelecteds([]);
  }

  return (
    <MiningContext.Provider value={{componentsSelecteds, saveComponents, clearComponents}} >
      {props.children}
    </MiningContext.Provider>
  )
}

export default Contexts;