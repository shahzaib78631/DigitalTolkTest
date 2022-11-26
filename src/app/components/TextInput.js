import React, { useState } from 'react'
import styled from 'styled-components';
import AppText from './Text';

const Container = styled.div`
    position:relative;
`

const ShowContainer = styled.button`
    position: absolute;
    box-sizing:border-box;
    top:50%;
    right:10px;
    border-width: 0;
    font-weight: 400;
    background-color: transparent;
    transform: translateY(-50%);
    cursor: pointer;
`

const Input = styled.input.attrs(props => ({
        type: props.type || "text",
        size: props.size || 16,
        error: props.error ? "#cb3837" : "#E8E8E8",
    }))`
    box-sizing: border-box;
    background: #F6F6F6;
    border: 2px solid ${props => props.error};
    border-radius: 8px;
    width: 100%;
    min-width: 340px;
    font-size: 16px;

    /* here we use the dynamically computed prop */
    margin: 8px 0;
    padding: ${props => props.size}px;
    padding-right: ${props => props.type === "password" ? "80px" : props.size};
`;

function TextInput({placeholder, type, error, onChange, value, ...otherProps}) {
    
    // STATE FOR SHOW/HIDE PASSWORD
    const [showPassword, setShowPassword] = useState(false)

    console.log (error)

    return (
        <Container>
            <Input error={error} {...otherProps} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={showPassword ? "text" : type} />
            {
                type === "password"
                &&
                <ShowContainer onClick={() => setShowPassword(!showPassword)}>
                    <AppText weight="500" size={16}>Show</AppText>
                </ShowContainer>
            }
        </Container>
    )
}

export default TextInput