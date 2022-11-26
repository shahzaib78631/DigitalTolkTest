import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
`

const Text = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #575767;
`

const SubText = styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #B9B9BE;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px 15px;
    gap: 4px;
    min-width: 302px;
    min-height: 45px;
`

function LocationListItem({text, subtext}) {
  return (
    <Container>
        {
            <Text>📍</Text>
        }
        <TextContainer>
            <Text>{text}</Text>
            <SubText>{subtext}</SubText>
        </TextContainer>
    </Container>
  )
}

export default LocationListItem