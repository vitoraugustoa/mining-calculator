import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../Components/Button/button';

import './expectedsGains.css';

function ExpectedsGains(props) {
  let history = useHistory();
  const [earning, setEarnings] = useState(props.location.state || {});

  useEffect(() => {
    if(!props.location.state)
      history.push("/");
  }, []);

  return (
    <div id="expecteds-gains-page">

      <h4>Lucros</h4>
      <section>
        <div className="titles-container">
          <b>ETH</b>
          <b>R$</b>
        </div>
        {
          earning ?
            (
              Object.entries(earning).map(e => (
                <div className="item-container">
                  <b>{e[0]}</b>
                  <span>{e[1].toFixed(6)}</span>
                  <span>{(e[1] * 20493).toFixed(2) } </span>
                </div>
              ))
            )
            :
            <span>Sem resultados.</span>
        }
      </section>

      <div className="button-container">
        <Button color="dark" onClick={() => history.push("/")} >
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default ExpectedsGains;