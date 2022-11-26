import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  text-align: center;
  color: ${props => props.color};
  font-weight: ${props => props.weight ? props.weight : 500};
  font-size: ${props => props.size}px;
`;

function AppText({children, size, color}) {
  return (
    <Title size={size ? size : "18px"} color={color} >{children}</Title>
  )
}

export default AppText