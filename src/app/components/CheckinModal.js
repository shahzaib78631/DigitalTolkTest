import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import httpRequest from '../utils/httpRequest'
import AppButton from './Button'

const Modal = styled.div`
    display: ${props => props.display};
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
`

const ModalContainer = styled.div`
    background: white;
    width: 50%;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    position: absolute;
    height: 320px;
    box-shadow: 0px 2px 20px rgba(38, 36, 131, 0.25);
    border-radius: 8px;
    display: flex;
    flex : 1; 
    padding: 48px;
    padding-bottom: 0px;
    flex-direction: column;
`

const Title = styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 10px;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: auto;
    align-self: center;
    justify-content: flex-end;
    align-items: center;
`

const FieldsContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const TextInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    /* padding-bottom: 3rem; */

`

const TextInput = styled.input`
    border: 0;
    /* padding-inline: 1rem; */
    height: ${props => props.height ? props.height : 30}px;
    flex: 1;
    text-align: left;
    vertical-align: text-top;
    margin-inline: 16px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #BDBDBD;

    &:focus{
        outline: none;
    }
`

const TextArea = styled.textarea`
    border: 0;
    /* padding-inline: 1rem; */
    height: ${props => props.height ? props.height : 30}px;
    flex: 1;
    text-align: left;
    vertical-align: text-top;
    margin-inline: 1px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #BDBDBD;
    margin-bottom: 5px;
    resize: none;


    &:focus{
        outline: none;
    }
`

const Seperator = styled.div`
    width: auto;
    height: 0px;
    left: 328px;
    top: 269px;
    margin-bottom: 32px;
    border: ${props => props.error ? 1 : 0.5}px solid ${props => props.error ? "#cb3837" : "rgba(189, 189, 189, 0.8)"};
`

const Container = styled.div`
    /* display: flex;
    flex: 1; */
    margin-right: 10%;
    margin-left: 10%;
    margin-top: 20px;
`

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

function CheckinModal({visible, setVisible, onLocationSave, selectedCheckin}) {

    const [address, setAddress] = useState("")

    // ERRORS
    const [errors, setErrors] = useState({address: false})

    // LOADING
    const [loading, setLoading] = useState(false);

    useEffect(() => 
    {
        // IF SELECTED TASK
        if (selectedCheckin)
        {
            setAddress (selectedCheckin.address)
        }

    }, [selectedCheckin])

    const getUserCoordinates = async () => 
    {
        const result = await navigator.permissions
        .query({ name: "geolocation" });
        
        if (result.state === "granted") 
        {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(handleSaveCheckIn);
        } 
        else if (result.state === "prompt") 
        {
            navigator.geolocation.getCurrentPosition(handleSaveCheckIn, positionErrors, options);
        } 
        else if (result.state === "denied") 
        {
            //If denied then you have to show instructions to enable location
        }
        
    }
    

    // FUNCTION FOR SAVING THE NEW TASK
    const handleSaveCheckIn = async (position) =>
    {
        // IF VALIDATION FAILES THEN DO NOT PROCEED FURTHER
        if (!validateTask ()) return 

        const userCoordinates = position.coords;

        // START THE LOADING
        setLoading (true)
        
        // BUILD THE PAYLOAD
        const payload = 
        {
            "address": address,
            "latitude": userCoordinates.latitude,
            "longitude": userCoordinates.longitude
        }

        // SEND THE HTTP REQUEST
        const response = await httpRequest ("/checkins", "POST", payload);

        // IF RESPONSE IS SUCCESS
        if (response.code === 201)
        {
            setAddress ("");
            onLocationSave()
        }

        // STOP THE LOADING
        setLoading (false)

    }
      
    const positionErrors = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    // FUNCTION FOR SAVING THE NEW TASK
    const handleUpdate = async () =>
    {
        // IF VALIDATION FAILES
        if (!validateTask ()) return 

        // START THE LOADING
        setLoading (true)
        
        // BUILD THE PAYLOAD
        const payload = 
        {
            ...selectedCheckin,
            "address": address,
        }

        // SEND THE HTTP REQUEST
        const response = await httpRequest (`/checkins/${selectedCheckin.id}`, "PUT", payload);

        // IF RESPONSE IS SUCCESS
        if (response.code === 201)
        {
            setAddress ("");
            onLocationSave()
        }

        // STOP THE LOADING
        setLoading (false)
    }

    const validateTask = () => 
    {
        if (address.trim() === "")
        {
            setErrors ((prev) => ({prev, address: true}))
            return false;
        }
        else if (errors.address)
        {
            setErrors ((prev) => ({prev, address: false}))
        }

        return true
    }

    return (
        <Modal display={visible ? "flex" : "none"}>
            <ModalContainer>
                <Title>New Checkin</Title>
                <Container>
                    <FieldsContainer>
                        <TextInputContainer>
                            📍
                            <TextArea 
                                onChange={(e) => setAddress(e.target.value)}
                                height={60}
                                value={address}
                                placeholder={"Address"} 
                            />
                        </TextInputContainer>
                        <Seperator error={errors.address} />
                    </FieldsContainer>
                </Container>
                <ButtonsContainer>
                    <AppButton 
                        title={selectedCheckin ? "Update" : "Save"} 
                        loading={loading}
                        loadingText={selectedCheckin ? "Updating..." : "Saving..."}
                        onClick={selectedCheckin ? handleUpdate : getUserCoordinates}
                    />
                    <AppButton 
                        title={"Cancel"}
                        size={12}
                        onClick={setVisible}
                        titleColor={"black"}
                        bgColor={"white"}
                    />
                </ButtonsContainer>
            </ModalContainer>
        </Modal>
    )
}

export default CheckinModal