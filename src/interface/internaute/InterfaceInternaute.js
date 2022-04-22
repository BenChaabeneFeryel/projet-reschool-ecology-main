import React from 'react'
import { Outlet } from 'react-router-dom'
import InterHeader from './InterHeader';
import Interfooter from './InterFooter';
import InterMain from './InterMain';


export default function InterfaceInternaute() {
  return (
    <>
      <InterHeader/> 
      <InterMain/>
      <Interfooter/>
    </>  )
}
