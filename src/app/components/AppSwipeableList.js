import { useState } from "react";
import {
  SwipeableList,
  SwipeableListItem
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";

import styled from "styled-components";


// DELETE CONTAINER
const DeleterContainer = styled.div`
    background-color: red;
    flex: 1;
    flex-grow: 1;
    display: flex;
    min-height: 65px;
`

// EDIT CONTAINER
const EditContainer = styled.div`
    background-color: green;
    flex: 1;
    flex-grow: 1;
    display: flex;
    min-height: 65px;
`

const AppSwipeableList = ({data = [], renderItem, handleDelete = () => {}, handleEdit = () => {}}) => {

  const swipeRightOptions = (task) => ({
    content: (
      <DeleterContainer />
    ),
    action: () => handleDelete(task)
  });

  const swipeLeftOptions = (item) => ({
    content: (
      <EditContainer />
    ),
    action: () => handleEdit(item)
  });

  const handleSwipeStart = () => {
    
  };

  const handleSwipeEnd = () => {
    
  };

  const threshold = 0.25;

  return (
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
          {
              renderItem(item)
          }
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </div>
  );
}

export default AppSwipeableList; 