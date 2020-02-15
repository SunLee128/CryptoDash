import React from 'react';
import _ from 'lodash';
const cc = require('cryptocompare')

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 'dashboard',
      favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
      ...this.savedSettings(),
      setPage: this.setPage, 
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setFilteredCoins: this.setFilteredCoins
    }
  }

  componentDidMount = () => {
    this.fetchCoins()
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    // console.log(coinList)
    this.setState({coinList})
  }

  //Add coin to favorite section
  addCoin = key => {
    let favorites = [...this.state.favorites];
    if(favorites.length < MAX_FAVORITES){
      favorites.push(key);
      this.setState({favorites});
    }
  }

  //Remove coin from favorite section
  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({favorites: _.pull(favorites, key)})
  }


  //Prevent same coin double up in favorite section
  isInFavorites = key => _.includes(this.state.favorites, key)

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard'
    });
    localStorage.setItem('cryptoDash',JSON.stringify({
      favorites: this.state.favorites
    }))
  }

  savedSettings(){
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))
    if (!cryptoDashData){
      return {page: 'settings', firstVisit: true}
    }
    let {favorites} = cryptoDashData; 
    return {favorites};
  }

  setPage = page => this.setState({page})

  setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})

  render(){
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }

}
