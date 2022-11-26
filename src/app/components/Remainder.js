import React from 'react'
import styled from 'styled-components'
import ClockIcon from '../../assets/ClockIcons'

const Container = styled.div`
    position: absolute;
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 360px;
    min-height: 122px;
    right: 0px;
    align-self: flex-end;
    top: 35px;
    right: 35px;
    overflow: hidden;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`

const Section = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: row;
`

const Title = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
`

const SubTitle = styled.div`
    margin-top: 5px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #575767;
`

const Column = styled.div`
    display: flex;
    flex: 1;
    margin-right: 16px;
    flex-direction: column;
`

const Footer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background: #F7F5F5;
    padding-right: 16px;

    /* border-radius: 0px 0px 10px 10px; */
`

const FooterText = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    padding-left: 20px;
    cursor: pointer;
    color: #000000;
`

function Remainder({task, onPress}) {
  return (
    <Container>
        <Section>
            <Column>
                <Title>{task.title}</Title>
                <SubTitle>{task.description}</SubTitle>
            </Column>
            <ClockIcon />
        </Section>
        <Footer>
            <FooterText onClick={() => onPress("skip")}>Skip</FooterText>
            <FooterText onClick={() => onPress("later")} >Remind me later</FooterText>
        </Footer>
    </Container>
  )
}

export default Remainder