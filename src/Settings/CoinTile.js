import React from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile } from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';

export default function ({ coinKey }) {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        let coin = coinList[coinKey];
        let TileClass = SelectableTile;

        return (
          <TileClass>
            <CoinHeaderGrid/>
            name={coin.CoinName}
          </TileClass>);
      }}
    </AppContext.Consumer>
  );
}
