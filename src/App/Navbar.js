import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const Navbar = styled.div `
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
`

const Logo = styled.div`
  font-size: 1.5em;
`
const ControlButtonElem = styled.div`
  cursor: pointer;
  ${props => props.active && css`
    text-shadow: 0px 0px 60px #03ff03;
  `}
`
function toProperCase(lower){
  return lower.charAt(0).toUpperCase() + lower.substr(1)
}

function ControlButton({name, active}){
  return (
    <ControlButtonElem active={active}>
      {toProperCase(name)}
    </ControlButtonElem>  
  )
}


export default function() {
  return (
    <Navbar>
      <Logo>CryptoDash</Logo>
      <div></div>
      <ControlButton active name="Dashboard" />
      <ControlButton name="setting" />
    </Navbar>
  )
}