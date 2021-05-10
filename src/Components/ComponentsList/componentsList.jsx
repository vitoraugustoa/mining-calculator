import React, { useEffect } from 'react';
import Link from 'react-router-dom';

import './componentsList.css';

function ComponentsList(props) {

  return (
    <div className="list">
      {props.list ?
        (
          <>
            {props.list.map(item => {
              return (
                <>
                  <div className={`item-list ${item.open && 'item-list-opened'}`} onClick={() => props.onClick(item.id)}>
                    <span>{item.name}</span>
                  </div>
                  <div className={`sub-list-container ${item.subList.length > 3 && 'overflow'} ${item.open ? '' : 'd-none'}`}>
                  { item.subList ?
                        item.subList.map(subItem => {
                          return (
                            <div className={`sub-list ${subItem.selected ? 'sub-item-selected' : ''}`}>
                              <div className="item-sub-list">
                                <span onClick={() => props.onSelectSubItem(item, subItem)}>{subItem.name}</span>
                                <input type="number" name="qtd-item1" id="qtd-item1" defaultValue={1} onChange={(event) => {
                                  props.onChangeValueSubItem(item.id, subItem, event.target.value);
                                }} />
                              </div>
                            </div>
                          )
                        })
                     :
                    (<span>Nenhum sub item cadastrado</span>)
                  }
                  </div>
                </>
              )
            })}
          </>
        ) : (<span>Nenhum item cadastrado</span>)
      }
    </div>
  );
}

export default ComponentsList;