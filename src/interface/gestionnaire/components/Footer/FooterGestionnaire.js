import * as React from 'react';
import styled from "styled-components";

const Footer = styled.div`
    background-color:#E8E8E8;
    border-top:2px solid #C0C0C0;
    width:100%;
    position: fixed;
    cursor: pointer;
    text-align: center;
    bottom: 0;
    left: 0;
    &:focus {
        outline: none;
    }`;
export default function FooterGestionnaire() {
  return (
    <Footer>

        Re school ecology © 2022    
        <a href='https://www.facebook.com/RESCHOOL.EDUCATION/'> facebook</a>
        <a href='https://www.facebook.com/RESCHOOL.EDUCATION/'> website</a>
    </Footer>
  )
}
