import React, {Component} from 'React'
import PropTypes from 'prop-types'
import { Text, View, Picker, StyleSheet } from 'react-native'

class SetArbitraryTime extends Component {
  static propTypes = {
    workLength: PropTypes.number.isRequired,
    breakLength: PropTypes.number.isRequired,
    changeWorkLength: PropTypes.func.isRequired,
    changeBreakLength: PropTypes.func.isRequired,
  }
  render() {
    // Generate values for the picker
    let pickerDurations = 0
    let pickerItems = []
    for (let i = 0; i < 12; i++) {
      pickerDurations += 5
      pickerItems.push(
        <Picker.Item label={`${pickerDurations}mn`} value={pickerDurations} key={pickerDurations} />
      )
    }

    return (
      <View style={styles.mt10}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}> Working session: </Text>
          <Picker
            selectedValue={this.props.workLength / 60}
            onValueChange={(itemValue) => this.props.changeWorkLength(itemValue * 60)}
            mode="dropdown"
            style={styles.picker}>
            {pickerItems}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}> Break session: </Text>
          <Picker
            selectedValue={this.props.breakLength / 60}
            onValueChange={(itemValue) => this.props.changeBreakLength(itemValue * 60)}
            mode="dropdown"
            style={styles.picker}>
            {pickerItems}
          </Picker>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  picker: {
    width: 115,
    color: '#FFF',
  },
  pickerContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  mt10: {
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold', color:'#FFF',
  }
})

export default SetArbitraryTime