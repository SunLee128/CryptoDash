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
      setCurrentFavorite: this.setCurrentFavorite,
      setFilteredCoins: this.setFilteredCoins
    }
  }

  componentDidMount = () => {
    this.fetchCoins()
    this.fetchPrices()
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    // console.log(coinList)
    this.setState({coinList})
  }

  fetchPrices = async () => {
    if(this.state.firstVisit) return;
    let prices = await this.prices();
    // We must filter the empty price objects (not in the lecture)
    prices = prices.filter(price => Object.keys(price).length);
    this.setState({prices});
  }

  prices = async () => {
    let returnData = [];
    for(let i = 0; i < this.state.favorites.length; i++){
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], 'AUD');
        returnData.push(priceData);
      } catch (e){
        console.warn('Fetch price error: ', e);
      }
    }
    return returnData;
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
    let currentFavorite = this.state.favorites[0];
    this.setState({
      firstVisit: false,
      page: 'dashboard',
      currentFavorite,
      prices: null
    }, () => {
        this.fetchPrices();
    });
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites,
      currentFavorite
    }));
  }

  setCurrentFavorite = (sym) => {
    this.setState({
      currentFavorite: sym,
      historical: null
    }, this.fetchHistorical);

    localStorage.setItem('cryptoDash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('cryptoDash')),
      currentFavorite: sym
    }))
  }

  savedSettings(){
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))
    if (!cryptoDashData){
      return {page: 'settings', firstVisit: true}
    }
    let {favorites, currentFavorite} = cryptoDashData; 
    return {favorites, currentFavorite};
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
