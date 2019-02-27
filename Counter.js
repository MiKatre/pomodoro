import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text} from 'react-native'

class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
  }
  render() {
    let count = this.props.count
    let minuts = Math.floor(count / 60)
    let seconds = count - minuts * 60

    return(
      <Text style={this.props.style}> 
        {minuts < 10 && '0'}{minuts.toString()} : {seconds < 10 && '0'}{seconds.toString()}
      </Text>
    )
  }
}

export default Counter