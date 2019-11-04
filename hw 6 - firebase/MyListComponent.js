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
            <View key={i} style={{flexDirection: 'row'}}>
              <Button title="X" onPress={() => this.onItemDelete(item, i)} />
              <TouchableOpacity onPress={() => this.onItemPress(item, i, item.votes)} style={{marginBottom: 10, backgroundColor: 'powderblue', padding: 10}}>
                <Text style={{fontSize: 24, color: 'black'}}>{item.band}</Text>
              </TouchableOpacity>
              <Text style={{fontSize: 24, color: 'black'}}>{item.votes}</Text>              
            </View>
        ))
        )

      return (
        <View>
          <View style={{marginBottom: 50, flexDirection: 'row'}}>
            <TextInput style={{backgroundColor: 'white', width: 100}} value={this.state.value} placeholder="Add a Band" onChangeText={text => this.onChange(text)}/>
            <Button disabled={!this.state.value} title="Add Item" onPress={() => this.onClick()}/>
          </View>
          {items}
        </View>
      )
    }
  }
  
  MyListComponent = store.connect(MyListComponent)

  export default MyListComponent