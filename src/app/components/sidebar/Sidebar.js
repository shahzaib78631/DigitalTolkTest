import { useAtom } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import LogoutIcon from '../../../assets/LogoutIcon'
import { loggedInStatus } from '../../utils/store'
import AppText from '../Text'
import SidebarItem from './SidebarItem'

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 250px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    flex-direction: column;
    /* padding-top: 2rem; */
    align-items: center;
`

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    width: 100%;
`

const LogoutContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-top: auto;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-end;
    /* margin-bottom: 50px; */
`

function Sidebar({menuItems, selectedMenuItem, setSelectedMenuItem}) {

  const [, setLoggedIn] = useAtom (loggedInStatus)

  return (
    <Container>
      <MenuContainer>
          {
            menuItems.map ((menuItem) => 
            {
              return (
                <SidebarItem 
                  key={menuItem.id}
                  title={menuItem.label} 
                  icon={menuItem.icon} 
                  onClick={() => setSelectedMenuItem(menuItem)}
                  active={menuItem.id === selectedMenuItem.id} 
                />
              )
            })
          }
      </MenuContainer>
      <LogoutContainer>
        <SidebarItem 
            title={"logout"} 
            icon={() => <LogoutIcon />} 
            onClick={() => setLoggedIn(false)}
            active={false} 
          />
      </LogoutContainer>
    </Container>
  )
}

export default Sidebar