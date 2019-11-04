import React from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import store from './store'
import types from './types'

class MyListComponent extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        value: ''
      }
    }

    onChange(text) {
      this.setState({value: text})
    }

    onClick() {
      this.setState({value: ''})
      
      this.props.store.dispatch(types.ADD_BAND, {
        band: this.state.value,
        votes: 1
      })
    }

    onItemDelete(item, index) {
      this.props.store.dispatch(types.DELETE_BAND, { id: item.id })
    }

    onItemPress(item, index, votes) {
      this.props.store.dispatch(types.INCREMENT_VOTE, {
        id: item.id,
        votes: votes + 1
      })
    }

    render() {
        const items = []

        this.props.store.state.items.forEach((item, i) => 
          items.push((
            <View key={i}>
              <View style={{backgroundColor: 'pink', marginBottom: 10}}>
                <TouchableOpacity onPress={() => this.onItemPress(item, i, item.votes)} style={{padding: 10}}>
                  <Text style={styles.font}>Band: {item.band}</Text>
                  <Text style={styles.font}>Votes: {item.votes}</Text>  
                </TouchableOpacity>
                <Button title="Delete to Start a War" onPress={() => this.onItemDelete(item, i)} />
              </View>
              
                        
            </View>
        ))
        )

      return (
        <View>
          <Text style={styles.font}>Tap to Vote for Your Favorite Band!</Text>
          <Text style={styles.font}>May the Best Band (and Fans) Win</Text>

          <View style={styles.margin}>
            <TextInput style={{backgroundColor: 'white', width: 200}} value={this.state.value} placeholder="Add a Band" onChangeText={text => this.onChange(text)}/>
            <View style={{backgroundColor: 'lightgrey'}}>
              <Button disabled={!this.state.value} title="Add Item" onPress={() => this.onClick()}/>
            </View>
          </View>
          {items}
        </View>
      )
    }
  }
  
const styles = StyleSheet.create({
  font: {
    fontSize: 20, 
    textAlign: 'center'
  },

  margin: {
    marginBottom: 20,
    marginTop: 20,
    flexDirection: 'row'

  }

})

MyListComponent = store.connect(MyListComponent)

export default MyListComponent