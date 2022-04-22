import React from 'react'
import styled from "styled-components";
import BadgeAvatars from "./Avatar"
import RightSideBarGestionnaire from "../RightSidebar/RightSideBarGestionnaire"

const Head = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-end;

  transition: all .5s ease;

  &:focus {
      outline: none;
  } 
`

export default function Header() {
  return (
    <Head>
      <BadgeAvatars/>
      <RightSideBarGestionnaire/>
    </Head>
  )
}