import React from 'react'

import styled from "styled-components";
import { theme } from '../../constants/theme';

const Container = styled.div`
  background-color: ${props => props.bg};
  color: ${props => props.titleColor ? props.titleColor : theme.colors.secondary};
  width: 100%;
  height: 50px;
  border-radius: 100px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-width: 0px;
  margin: 10px 0px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const TitleContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: flex-start;
`

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 20px;
  flex: 1;
`

function SidebarItem({onClick, active, title, icon, center = true, titleColor, bgColor}) {
  return (
    <Container
      bg={active ? theme.colors.primary : theme.colors.white}
      titleColor={active ? theme.colors.white : theme.colors.primary}
      onClick={onClick}
    >
      {
        icon 
        &&
        <IconContainer>
        {
          icon(active ? theme.colors.secondary : theme.colors.primary)
        }
        </IconContainer>
      }
      <TitleContainer center={center}>
      {
        title
      }
      </TitleContainer >
    </Container>
  )
}

export default SidebarItem