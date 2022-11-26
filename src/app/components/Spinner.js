import React from "react";
import styled from "styled-components";


const Center = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default function LoadingSpinner() {
  return (
    <Center>
      <div className="spinner-container">
        <div className="loading-spinner">
        </div>
      </div>
    </Center>
  );
}