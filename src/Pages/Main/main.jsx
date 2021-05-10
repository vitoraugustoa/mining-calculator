import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import ComponentsList from '../../Components/ComponentsList/componentsList';
import Button from '../../Components/Button/button';
import { MiningContext } from '../../Contexts/miningContext';

import './main.css';

function Main() {
  let history = useHistory();
  const miningContext = useContext(MiningContext);
  const [components, setComponents] = useState([
    {
      id: 1,
      name: "Processador",
      open: false,
      multipleSelect: false,
      subList: [
        { id: 1, name: "Intel Core i3", mhs: 0, selected: false, qtd: 1 },
        { id: 2, name: "Intel Core Phentium", mhs: 0, selected: false, qtd: 1 },
        { id: 3, name: "Intel Core i5", mhs: 0, selected: false, qtd: 1 },
      ]
    },
    {
      id: 2,
      name: "Fonte",
      open: false,
      multipleSelect: true,
      subList: [
        { id: 1, name: "EVGA 1000W Modular", mhs: 0, selected: false, qtd: 1 },
        { id: 2, name: "EVGA 800W  Modular", mhs: 0, selected: false, qtd: 1 },
        { id: 3, name: "EVGA 750W Modular", mhs: 0, selected: false, qtd: 1 },
      ]
    },
    {
      id: 3,
      name: "Placa de Vídeo",
      open: false,
      multipleSelect: true,
      subList: [
        { id: 1, name: "Nvidea RTX 3090 - 125 MH/s", mhs: 125, selected: false, qtd: 1 },
        { id: 2, name: "Nvidea RTX 3080 - 100 MH/s", mhs: 100, selected: false, qtd: 1 },
        { id: 3, name: "Nvidea RTX 3060 TI - 60 MH/s", mhs: 60, selected: false, qtd: 1 },
        { id: 4, name: "Nvidea RTX 3070 - 60 MH/s", mhs: 60, selected: false, qtd: 1 },
        { id: 5, name: "AMD RX 5700 XT - 57 MH/s", mhs: 57, selected: false, qtd: 1 },
        { id: 6, name: "AMD RX 5700 - 56 MH/s", mhs: 56, selected: false, qtd: 1 },
        { id: 7, name: "AMD RX 5500 XT 8GB - 27 MH/s", mhs: 27, selected: false, qtd: 1 },
        { id: 8, name: "AMD RX 6800 - 61 MH/s", mhs: 61, selected: false, qtd: 1 },
        { id: 9, name: "AMD RX 6800 XT - 65 MH/s", mhs: 65, selected: false, qtd: 1 },
        { id: 10, name: "NVIDIA RTX 2070 SUPER - 44 MH/s", mhs: 44, selected: false, qtd: 1 },
        { id: 11, name: "NVIDIA RTX 2060 SUPER - 43 MH/s", mhs: 43, selected: false, qtd: 1 },
        { id: 12, name: "NVIDIA RTX 2080 SUPER - 48 MH/s", mhs: 48, selected: false, qtd: 1 },
      ]
    },
    {
      id: 4,
      name: "Placa Mãe",
      open: false,
      multipleSelect: false,
      subList: [
        { id: 1, name: "Biostar TB250-BTCPRO - LGA 1151 - 12 Slots", mhs: 0, selected: false, qtd: 1 },
        { id: 2, name: "B250 MINING EXPERT LGA 1151 - 12 Slots", mhs: 0, selected: false, qtd: 1 },
      ]
    },
  ]);

  function onClickCalc() {
    let qtdMotherboardsSelecteds = 0;
    let qtdSourcesSelecteds = 0;
    let oldList = components;
    let subItemsSelecteds = [];

    oldList.forEach(oldItem => {
      oldItem.subList.forEach(oldSubItem => {
        if (oldSubItem.selected)
          subItemsSelecteds.push({ typeId: oldItem.id, type: oldItem.name, ...oldSubItem });
      });
    });

    subItemsSelecteds.forEach(e => {
      if (e.typeId === 2) {
        qtdSourcesSelecteds += e.qtd;
      }

      if (e.typeId === 3) {
        qtdMotherboardsSelecteds += e.qtd;
      }
    });

    if(qtdMotherboardsSelecteds > 6 && qtdSourcesSelecteds < 2) {
      toast.error('Mais de 6 placas de video selecionadas, favor selecionar mais de uma fonte.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      miningContext.saveComponents(subItemsSelecteds);
      history.push("/HardwareVision", subItemsSelecteds);
    }
  }

  function onSelectSubItem(item, subItem) {
    let oldList = components;
    let subItemList = oldList.find(oldItem => oldItem.id == item.id).subList.map(oldSubItem => {
      if (oldSubItem.id == subItem.id) {
        oldSubItem.selected = !oldSubItem.selected;
      }
      else if (!item.multipleSelect) {
        oldSubItem.selected = false;
      }

      return oldSubItem;
    });

    let newList = oldList.map(oldItem => {
      if (oldItem.id == item.id) {
        oldItem.subList = subItemList;
      }

      return oldItem;
    })

    setComponents(newList);
  }

  function onChangeValueSubItem(idItem, subItem, value) {
    let oldList = components;
    let subItemList = oldList.find(oldItem => oldItem.id == idItem).subList.map(oldSubItem => {
      if (oldSubItem.id == subItem.id)
        oldSubItem.qtd = Number(value);

      return oldSubItem;
    });

    let newList = oldList.map(oldItem => {
      if (oldItem.id == idItem)
        oldItem.subList = subItemList;

      return oldItem;
    })

    setComponents(newList);
  }

  function onClickItem(idItem) {
    let oldList = components;
    let newList = oldList.map(oldItem => {
      if (oldItem.id == idItem) {
        oldItem.open = !oldItem.open;
      }
      else {
        oldItem.open = false;
      }

      return oldItem;
    })

    setComponents(newList);
  }

  return (
    <div id="main-page">
      <ComponentsList
        list={components}
        onClick={onClickItem}
        onChangeValueSubItem={onChangeValueSubItem}
        onSelectSubItem={onSelectSubItem} />
      <div className="button-container">
        <Button color="dark" onClick={onClickCalc} >
          Calcular
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Main;