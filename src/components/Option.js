import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default props => {

    const stylesOption = [styles.textItemOption]

    const isArray = props.selected instanceof Array
    let showValue = props.opt
    let isSelected = props.selected.toString() == props.value.toString();

    if (isArray) {
        isSelected = props.selected.join('') == props.value.join('')
        showValue = props.opt.join(':')
    }

    if (isSelected) stylesOption.push(styles.textOptSelected)

    return (
        <TouchableOpacity onPress={() => props.onSelect(props.value)}>
            <Text style={stylesOption}>{showValue}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textItemOption: {
        borderColor: "red",
        padding: 10,
        margin: 1,
        borderRadius: 5,
        borderColor: "#ccc",
        backgroundColor: "#FF6347",
        fontSize: 16,
        color: "#F5DEB3",
        fontWeight: "bold",
    },
    textOptSelected: {
        backgroundColor: "red",
        color: "#fff"
    },
})