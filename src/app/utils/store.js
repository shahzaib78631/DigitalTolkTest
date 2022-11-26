import { atomWithStorage } from 'jotai/utils'


// Set the string key and the initial value
const loggedInStatus = atomWithStorage('loggedStatus', false)

export {loggedInStatus}