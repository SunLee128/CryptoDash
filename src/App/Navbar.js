import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from './AppProvider';

const Navbar = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
`;

const Logo = styled.div`
  font-size: 1.5em;
`;
const ControlButtonElem = styled.div`
  cursor: pointer;
  ${props => props.active && css`
    text-shadow: 0px 0px 60px #03ff03;
  `}
`;
function toProperCase (lower) {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
}

function ControlButton ({ name }) {
  return (
    <AppContext.Consumer>
      {({ firstVisit,page, setPage }) => (
        <ControlButtonElem
          active={page === name}
          onClick={() => setPage(name)}
          hidden={firstVisit && name === 'dashboard'}
        >
          {toProperCase(name)}
        </ControlButtonElem>

      )}
    </AppContext.Consumer>
  );
}

export default function () {
  return (
    <Navbar>
      <Logo>CryptoDash</Logo>
      <div />
      <ControlButton active name='Dashboard' />
      <ControlButton name='settings' />
    </Navbar>
  );
}
