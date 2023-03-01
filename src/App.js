import React, { useContext, useState } from 'react';
import './App.scss';
import  { AppContext }  from './AppContext'

function App() {
  const { filter, giveMenu, setGiveMenu, getMenu, setGetMenu} = useContext(AppContext);

  // const [selectedGiveItem, setSelectedGiveItem] = useState({value: 'choose'})
  const [selectedGiveItem, setSelectedGiveItem] = useState('Bitcoin BTC')
  const [selectedGetItem, setSelectedGetItem] = useState('Наличные RUB')

  // const handleChange = (e) => {
  //   setSelectedGiveItem({value: e.target.value});
  //   console.log(selectedGiveItem)
  // }

  const toggleActiveGive = (index) => {
    setGiveMenu({...giveMenu, active: giveMenu.menu[index]})
  }

  const toggleActiveGet = (index) => {
    setGetMenu({...getMenu, active: getMenu.menu[index]})
  }

  const toggleActiveStylesGive = (index) => {
    if(giveMenu.menu[index] === giveMenu.active) {
      return "--active"
    } else {
      return '' 
    }
  }
  const toggleActiveStylesGet = (index) => {  
    if(getMenu.menu[index] === getMenu.active) {
      return "--active"
    } else {
      return '' 
    }
  }

  return (
    <div className="App">
      {selectedGiveItem}
      <div className='give'>
        <h2>Отдаете</h2>
        <div className="give__wrapper">
          <ul className="give__list" >
            {giveMenu.menu.map((el, index) => (
              <div key={el.name} onClick={() => toggleActiveGive(el.id)} className={`give__list__wrap${toggleActiveStylesGive(index)}`}>
                <li className="give__item">{el.name}</li>
              </div>
            ))}
          </ul>
        </div>
        <div className="give__wrapper">
          <input className='give__input' type='text' />
          <select className="give__drop-down" value={selectedGiveItem} onChange={(event) => setSelectedGiveItem(event.target.value)}>
            {giveMenu.active === null && filter.map((el, index) => <option className="give__option" key={index} >{el.from.name}</option>)}
            {giveMenu.active?.id === 0 && filter.map((el, index) => <option className="give__option" key={index}>{el.from.name}</option>)}
            {giveMenu.active?.id === 1 && filter.map(el => {
              if(el.from.code === 'BTC' || el.from.code === 'ETH' || el.from.code === 'USDTTRC') {
                return <option className="give__option" key={el.from.name}>{el.from.name}</option>
              }
            })}
            {giveMenu.active?.id === 2 && filter.map(el => {
              if(el.from.code === 'ACRUB' || el.from.code === 'SBERRUB' || el.from.code === 'TCSBRUB') {
                return <option className="give__option" key={el.from.name}>{el.from.name}</option>
              }
            })}
            {giveMenu.active?.id === 3 && filter.map(el => {
              if(el.from.code === 'CASHUSD' || el.from.code === 'CASHRUB') {
                return <option className="give__option" key={el.from.name}>{el.from.name}</option>
              }
            })}
          </select>
        </div>
      </div>
      
      {selectedGetItem}
      <div className='get'>
        <h2>Получаете</h2>
        <div className="get__wrapper">
          <ul className="get__list" >
            {getMenu.menu.map((el, index) => (
              <div key={el.name} onClick={() => toggleActiveGet(el.id)} className={`get__list__wrap${toggleActiveStylesGet(index)}`}>
                <li className="get__item">{el.name}</li>
              </div>
            ))}
          </ul>
        </div>
        
        <div className="get__wrapper">
          <input className='get__input' type='text' />
          <select className="get__drop-down" value={selectedGetItem} onChange={(event) => setSelectedGetItem(event.target.value)}>
            {filter.map((el, index) => {
              if((el.from.name.trim() === selectedGiveItem) ) {
                return el.to.map((element, ind) => <option className="get__option" key={ind} >{element.name}</option>)
              }
            })}
            {filter.map((el, index) => {
              if((el.from.name.trim() === selectedGiveItem)) {
                return el.to.map((element, ind) => {
                    if(element.code === el.from.code) {
                      return  <option className="get__option" key={ind} >{element.name}</option>
                    }
                  })
              }
            })}
            {getMenu.active?.id === 1 && filter.map(el => {
              if(el.from.code === 'BTC' || el.from.code === 'ETH' || el.from.code === 'USDTTRC') {
                return el.to.map((element, ind) => {
                  if(element.code === el.from.code) {
                    return  <option className="get__option" key={ind} >{element.name}</option>
                  }
                })
              }
            })}
            {getMenu.active?.id === 2 && filter.map(el => {
              if(el.from.code === 'ACRUB' || el.from.code === 'SBERRUB' || el.from.code === 'TCSBRUB') {
                return <option className="give__option" key={el.from.name}>{el.from.name}</option>
              }
            })}
            {getMenu.active?.id === 3 && filter.map(el => {
              if(el.from.code === 'CASHUSD' || el.from.code === 'CASHRUB') {
                return <option className="give__option" key={el.from.name}>{el.from.name}</option>
              }
            })}
          </select>
        </div>
      </div>

    </div>
  );
}

export default App;
