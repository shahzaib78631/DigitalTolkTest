import { useAtom } from 'jotai';
import React, { useState } from 'react'
import styled from 'styled-components'
import AppButton from '../components/Button'
import AppText from '../components/Text';
import TextInput from '../components/TextInput';
import { loggedInStatus } from '../utils/store';

const Container = styled.div`
    flex: 1;
    /* margin: 0 40%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

function Login() {
  const [, setLoggedIn] = useAtom (loggedInStatus)

  const [errors, setErrors] = useState ({email: false, password: false});

  const [email, setEmail] = useState ("")
  const [password, setPassword] = useState ("")

  // FUNCTION FOR VALIDATING THE EMAIL ADDRESS
  const validateEmail = () =>
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      {
        return (true)
      }
        
      alert("You have entered an invalid email address!")
      setErrors ((prev) => ({...prev, email: true}))

      return (false)
  }

  // FUNCTION FOR VALIDATING THE PASSWORD
  const validatePassword = () =>
  {
    if (password.length > 5)
      {
        return (true)
      }
        
      alert("Password Must Of 5 Character long!")

      setErrors ((prev) => ({...prev, password: true}))

      return (false)
  }

  const handleLogin = () =>
  {
      if (validateEmail() && validatePassword())
      {
        setLoggedIn (true)
      }
  }

  return (
    <Container>
        <AppText size={30} >Log In</AppText>
        <TextInput value={email} onChange={(text) => setEmail(text)} error={errors.email} placeholder={"Email"} />
        <TextInput value={password} onChange={(text) => setPassword(text)}  error={errors.password} placeholder={"Password"} type="password" />
        <AppButton title={"Log In"} onClick={handleLogin} />
    </Container>
  )
}

export default Login