import { useState } from "react";
import {
  SwipeableList,
  SwipeableListItem
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";

import ChecklistItem from "./ChecklistItem";
import styled from "styled-components";


const DeleterContainer = styled.div`
    background-color: red;
    flex: 1;
    flex-grow: 1;
    display: flex;
    min-height: 60px;
`

const EditContainer = styled.div`
    background-color: green;
    flex: 1;
    flex-grow: 1;
    display: flex;
    min-height: 60px;
`

const AppSwipeableList = ({data = [], onCheckboxClick = () => {}}) => {

  const swipeRightOptions = (name) => ({
    content: (
      <DeleterContainer />
    ),
    action: () => {}
  });

  const swipeLeftOptions = (name) => ({
    content: (
      <EditContainer />
    ),
    action: () => {}
  });

  const handleSwipeStart = () => {
    
  };

  const handleSwipeEnd = () => {
    
  };

  const threshold = 0.25;

  return (
    <div className="App">
      <div className="complex-swipeable-list__container">
        <SwipeableList threshold={threshold}>
          {data.map((item) => (
            <SwipeableListItem
              key={item.id}
              swipeLeft={swipeLeftOptions(item)}
              swipeRight={swipeRightOptions(item)}
              onSwipeEnd={handleSwipeEnd}
              onSwipeStart={handleSwipeStart}
            >
            <ChecklistItem
                onClick={() => onCheckboxClick(item)} 
                key={item.id} 
                checked={false} 
                dueDate={item.due_at} 
                title={item.title} 
            />
            </SwipeableListItem>
          ))}
        </SwipeableList>
      </div>
    </div>
  );
}

export default AppSwipeableList; 