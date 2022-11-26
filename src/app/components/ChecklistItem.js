import React from 'react'
import styled from 'styled-components'
import CheckboxChecked from '../../assets/CheckboxChecked'
import CheckboxUnchecked from '../../assets/CheckboxUnchecked'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    /* min-height: 60px; */
    width: 100%;
    user-select: none;
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
    margin-bottom: 10px;
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

const Button = styled.div`
    cursor: pointer;
`

function ChecklistItem({checked, title, dueDate, onDelete, onEdit, onClick}) {

  return (
    <Container>
        <Button onClick={onClick}>
        {
            checked
            ?
                <CheckboxChecked />
                :
                <CheckboxUnchecked />
            }
        </Button>
        <TextContainer>
            <Text>{title}</Text>
            {
                !checked
                &&
                <SubText>⏰ {dueDate}</SubText>
            }
        </TextContainer>
    </Container>
  )
}

export default ChecklistItem