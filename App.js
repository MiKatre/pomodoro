import React from 'react';
import { StyleSheet, Text, View, Button, Picker } from 'react-native';
import {vibrate} from './utils'
import Counter from './Counter'
import SetArbitraryTime from './SetArbitraryTime'

export default class App extends React.Component {
  constructor() {
    super()
    this.intialWorkLength = 1500 // 25 min
    this.intialBreakLength = 300 // 5 min
    this.state = {
      workLength: this.intialWorkLength, 
      breakLength: this.intialBreakLength, 
      count: this.intialWorkLength,
      paused: true,
      beggined: false,
      break: false,
    }
  }

  start = () => {
    if (!this.state.beggined) {
      this.inc = setInterval(this.decrement, 1000)   
      this.setState({ beggined: true, paused: false, count: this.state.workLength }) 
    } else if (this.state.paused && !this.state.beggined) {
      this.inc = setInterval(this.decrement, 1000)   
      this.setState({ paused: false }) 
    } else { // Beggined & paused
      this.inc = setInterval(this.decrement, 1000)   
      this.setState({ paused: false }) 
    }
  }

  stop = () => {
    clearInterval(this.inc)
    this.setState({ paused: true })
  }

  reset = () => {
    clearInterval(this.inc)
    this.setState({
      count: this.intialWorkLength,
      workLength: this.intialWorkLength,
      breakLength: this.intialBreakLength,
      paused: true,
      beggined: false,
      break: false,
    })
  }

  decrement = () => {
    if (this.state.count === 1) vibrate() // Vibrate when decrementing from 1 to 0
    
    if (this.state.count === 0) {
      this.setState(prevState => ({
        count: prevState.break ? this.state.workLength : this.state.breakLength , 
        break: !prevState.break
      }))
    } else {
      this.setState(prevProps => ({
        count: prevProps.count - 1,
      }))
    }
  }

  changeWorkLength = length => {
    if(length > 0) {
      this.stop()
      this.setState({
       workLength: length, 
       count: length,
       paused: true,
       beggined: false,
       break: false,
      })
    }
  }

  changeBreakLength = length => {
    if(length > 0) {
      this.stop()
      this.setState({ 
      breakLength: length, 
      count: this.state.workLength,
      paused: true,
      beggined: false,
      break: false,
      })
    }
  }

  render() {
    let button = this.state.paused 
    ? <Button title="Start" onPress={this.start}/>
    : <Button title="Pause" onPress={this.stop}/>

    let text = this.state.break 
    ? <Text style={styles.text}> BREAK TIME </Text>
    : <Text style={styles.text}> WORK TIME </Text>

    return (
      <View style={styles.container}>
        {text}
        <Counter count={this.state.count } style={styles.text}/>
        <View style={styles.horizontalRow}>
          {button}
          <Button title="Reset" onPress={this.reset}/>
        </View>
        <SetArbitraryTime 
          workLength={this.state.workLength} 
          breakLength={this.state.breakLength}
          changeWorkLength={this.changeWorkLength}
          changeBreakLength={this.changeBreakLength}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0a202',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  horizontalRow: {
    flexDirection: 'row',
  }
});

// Timer 
// display minuts and seconds in text    [X]
// Count down until 00:00                [X]
// Buzz when 00:00                       [X]
// Switch between 25 && 5 Minutes        [X]
// Start -  Stop - Reset                 [X]
// Set arbitrary time                    [X]