import React from 'react'

import styled from "styled-components";

import { theme } from '../constants/theme';

const Container = styled.div`
  background-color: ${props => props.bg};
  color: ${props => props.titleColor ? props.titleColor : theme.colors.secondary};
  width: 340px;
  height: 50px;
  /* padding: 10px 60px; */
  border-radius: 100px;
  border-top-left-radius: ${props => props.borderLeftRounded ? 100 : 0}px;
  border-bottom-left-radius: ${props => props.borderLeftRounded ? 100 : 0}px;
  border-width: 0px;
  margin: 10px 0px;
  cursor: pointer;
  font-weight: 600;
  font-size: ${props => props.size ? props.size : "16px"};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const TitleContainer = styled.div`
  display: flex;
  flex: 1;
  font-size: ${props => props.size ? props.size : 16}px;
  justify-content: ${props => props.center ? "center" : "flex-start"};
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 20px;
  flex: 1;
`

function AppButton({onClick, title, size, icon, loadingText = "", loading = false, center = true, borderLeftRounded = true, titleColor, bgColor}) {
  return (
    <Container
      bg={bgColor ? bgColor : theme.colors.primary}
      borderLeftRounded={borderLeftRounded ? true : false}
      titleColor={titleColor ? titleColor : theme.colors.white}
      
      onClick={!loading ? onClick : () => {}}
    >
      {
        icon 
        &&
        <IconContainer>
        {
          icon()
        }
        </IconContainer>
      }
      <TitleContainer center={center} size={size}>
      {
        loading 
        ?
        loadingText
        :
        title
      }
      </TitleContainer >
    </Container>
  )
}

export default AppButton