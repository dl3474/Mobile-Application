import { AsyncStorage } from 'react-native'
import { firestore } from './firebase'
import types from './types'

export default function reducer(state, action) {
 
    let newState = {}

    switch (action.type) {

        case types.SET_BANDS:
                var items = state.items
                return {
                    ...state,
                    items: action.props
                }
        
        case types.ADD_BAND:
            var items = state.items

            // add item locally
            items.push(action.props)

            // add item remotely
            firestore.collection('bands').add({band: action.props.band, votes: action.props.votes})

            return {
                ...state,
                items
            }
        
        case types.DELETE_BAND:
            // delete item from local store
            var items = state.items.filter(item => item.id != action.props.id)
            
            // delete from firestore
            firestore.collection('bands').doc(action.props.id).delete()

            return {
                ...state,
                items
            } 

        case types.INCREMENT_VOTE:
            firestore.collection('bands').doc(action.props.id).update({votes: action.props.votes})

            // update values in place
            var items = state.items.map(item => {
                if (item.id == action.props.id) {
                    item.votes = action.props.votes
                }

                return item
            })

            return {
                ...state,
                //items
            }
    
        default:
            newState = state
            break;
    }


    return newState
}