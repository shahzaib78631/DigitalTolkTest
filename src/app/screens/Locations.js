import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CheckboxChecked from '../../assets/CheckboxChecked'
import CheckboxUnchecked from '../../assets/CheckboxUnchecked'
import AppSwipeableList from '../components/AppSwipeableList'
import AppButton from '../components/Button'
import CheckinModal from '../components/CheckinModal'
import ChecklistItem from '../components/ChecklistItem'
import LocationListItem from '../components/LocationListItem'
import LoadingSpinner from '../components/Spinner'
import httpRequest from '../utils/httpRequest'

const Container = styled.div`
    display: ${props => props.display};
    flex: 1;
    flex-direction: column;
`

const Text = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #575767;
  margin-bottom: 10px;
`

const Section = styled.div`
  display: flex;
  /* max-height: 250px; */
  flex-direction: column;
  margin-top: 48px;
`

const Button = styled.div`
  cursor: pointer;
  width: fit-content;
`

function Locations({display = false}) {

  // STATE FOR SHOW HIDE CHECKIN MODAL
  const [showCheckinModal, setShowCheckinModal] = useState (false);

  // STATE FOR SHOW HIDE LOADER
  const [loading, setLoading] = useState(false);

  const [checkins, setCheckins] = useState([])

  const [currentLocation, setCurrentLocation] = useState(null)

  const [selectedCheckin, setSelectedCheckin] = useState(null)

  useEffect (() => 
  {
    getUserCheckins()
  }, [])

  // FUNCTION FOR GETTING THE CHECKINS
  const getUserCheckins = async (loadSilently = false) => 
  {

    if (!loadSilently)
      setLoading (true)

    // SEND HTTP REQUEST
    const response = await httpRequest ("/checkins", "GET");

    // IF RESPONSE IS SUCCESSFULL
    if (response.code === 200)
    {
      setCurrentLocation (response.checkins.pop())
      setCheckins (response.checkins)
    }

    if (!loadSilently)
      setLoading (false)
  }

  // FUNCTION FOR REMOVING THE CHECKIN
  const removeFromCheckins = (checkin) => 
  {
    // REMOVE THE CHECKIN FROM CHECKINS ARRAY
    const filteredCheckins = checkins.filter(i => i.id !== checkin.id)

    // UPDATE THE CHECKINS
    setCheckins (filteredCheckins);
  }

  const handleDelete = async (checkin) =>
  {
    setLoading (true);

    // SEND THE HTTP REQUEST
    const response = await httpRequest (`/checkins/${checkin.id}`, "DELETE")

    // IF TASK IS SUCCESSFULLY DELETED
    if (response.code === 204)
    {
      removeFromCheckins(checkin)
    }

    setLoading (false)
  }
  
  const handleEdit = (checkin) =>
  {
    // SET THE SELECTED TASK
    setSelectedCheckin (checkin);

    // SHOW THE MODAL
    setShowCheckinModal (true)
  }

  // IF LOADING IS TRUE
  if (loading && display) 
  {
    return <LoadingSpinner />
  }

  return (
    <Container display={display ? "flex" : "none"} >
      <Button onClick={() => setShowCheckinModal(!showCheckinModal)}>
        <Text>+ Check In</Text>
      </Button>
      
      <Section>
        <Text>Current Location</Text>
        {
          currentLocation 
          &&
          <LocationListItem subtext={`${currentLocation.latitude}° N, ${currentLocation.longitude}° E`} text={currentLocation.address} />
        }
      </Section>
      <Section>
        <Text>Previous Locations</Text>
        <AppSwipeableList
          data={checkins}
          handleDelete={(checkin) => handleDelete(checkin)}
          handleEdit={(checkin) => handleEdit(checkin)}
          renderItem=
          {
            (checkin) => 
            <LocationListItem subtext={`${checkin.latitude}° N, ${checkin.longitude}° E`} text={checkin.address} />
          }
        />
      </Section>
      <CheckinModal 
        visible={showCheckinModal}
        selectedCheckin={selectedCheckin}
        setVisible={() => setShowCheckinModal(false)}
        onLocationSave={() => getUserCheckins(true)}
      />
    </Container>
  )
}

export default Locations