import React from 'react';
import styled from 'styled-components';
import { fontSize2 } from '../Shared/Styles';
import { AppContext } from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
  display: grid; 
  grid-template-columns: 200px 1fr; 
`;

const SearchInput = styled.input`
  ${fontSize2}
  border: 1px solid; 
  height: 25px; 
  place-self: center left; 
`;

const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
  // Get all the coin symbols
  const coinSymbols = Object.keys(coinList);
  // Get all the coin names, map symbol to name
  const coinNames = coinSymbols.map(sym => coinList[sym].CoinName);
  const allStringsToSearch = coinSymbols.concat(coinNames);
  const fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map(result => result.string);

  const filteredCoins = _.pickBy(coinList, (result, symKey) => {
    const coinName = result.CoinName;
    return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName));
  });
  setFilterCoins(filteredCoins);
}, 500);

function filterCoins (e, setFilteredCoins, coinList) {
  const inputValue = e.target.value;
  if (!inputValue) {
    setFilteredCoins(null);
    return;
  }
  handleFilter(inputValue, coinList, setFilteredCoins);
}

export default function () {
  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList }) =>
        <SearchGrid>
          <h2>Search all coins</h2>
          <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)} />
        </SearchGrid>}
    </AppContext.Consumer>
  );
}
