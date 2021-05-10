import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../Components/Button/button';

import './hardwareVision.css';

function HardwareVision(props) {
  let history = useHistory();
  const [sumMhs, setSumMhs] = useState(0);
  const [items, setItems] = useState([]);
  useEffect(() => {
    let hardwareItems = props.location.state || [];
    if(hardwareItems.length == 0)
      history.push("/");

    setItems(hardwareItems);
    let sum = 0;
    hardwareItems.length > 0 && hardwareItems.forEach(item => {
      sum += item.mhs * item.qtd;
    });
    setSumMhs(sum);
  }, []);

  function onClickCal() {
    let earnings = {
      min: 0,
      hour: 0,
      day: 0,
      week: 0,
      month: 0,
      year: 0,
    }
    let blockTime = 13.351438188494493;
    let difficulty = 7685324654041009;
    let netHashGH = (difficulty / blockTime) / 1e9;
    let userRatio = sumMhs * 1e6 / (netHashGH * 1e9);
    let blocksPerMin = 60.0 / blockTime;
    let ethPerMin = blocksPerMin * 5.0;
    earnings.min = userRatio * ethPerMin;
    earnings.hour = earnings.min * 60;
    earnings.day = earnings.hour * 24;
    earnings.week = earnings.day * 7;
    earnings.month = earnings.day * 30;
    earnings.year = earnings.day * 365;

    history.push("/ExpectedsGains", earnings);
  }

  return (
    <div id="hardware-vision-page">
      <h4>Seus Hardwares</h4>
      <section>
        {items.length > 0 ?
          items.map(item => (
            <div className="item-container">
              <span>{item.qtd} - {item.type} - {item.name}</span>
            </div>
          ))
          :
          <span>Sem hardware selecionado.</span>
        }
      </section>

      <h4>Hash Hates (MH/s)</h4>
      <div class="sum-mhs">
        <span>{sumMhs}</span>
      </div>

      <div className="button-container">
        <Button color="light" onClick={() => history.push("/")} >
          Voltar
        </Button>
        <Button color="dark" onClick={onClickCal} >
          Calcular
        </Button>
      </div>
    </div>
  );
}

export default HardwareVision;