import React from 'react'
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native'

// Import initialized store singleton
import store from './store'
import { firestore } from './firebase'
import types from './types'

import MyList from './MyListComponent'


firestore.collection('bands').onSnapshot((snapshot) => {
  const items = []
  snapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      items.push({...doc.data(), id: doc.id})
  });

  store.dispatch(types.SET_BANDS, items)
});

export default function App() {
  return (
    <store.Provider>
      <View style={styles.container}>
        <MyList />
      </View>
    </store.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
