import React from 'react'
import { Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'

export default props => {

    const stylesOptionText = props.isImg ? [styles.textItemOptionImg] : [styles.textItemOption]
    const stylesOptionImage = [styles.optCard]

    const isArray = props.selected instanceof Array
    let showValue = props.opt
    let isSelected = props.selected.toString() == props.value.toString();

    if (isArray) {
        isSelected = props.selected.join('') == props.value.join('')
        showValue = props.opt.join(':')
    }

    if (isSelected) {
        stylesOptionText.push(styles.textOptSelected)
        stylesOptionImage.push(styles.optCardSelected)
    }
    if ( props.small ) stylesOptionImage.push(styles.optCardSmall)

    return (
        <TouchableOpacity onPress={() => props.onSelect(props.value)}>
            {props.isImg
                ? <ImageBackground source={props.source} style={stylesOptionImage} >
                    <Text style={stylesOptionText}>{showValue}</Text>
                </ImageBackground>
                : <Text style={stylesOptionText}>{showValue}</Text>
            }

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
    textItemOptionImg: {
        borderColor: "red",
        padding: 3,
        borderColor: "#ccc",
        backgroundColor: "#FF6347",
        fontSize: 10,
        color: "#F5DEB3",
        fontWeight: "bold",
        textAlign: "center"
    },
    textOptSelected: {
        backgroundColor: "red",
        color: "#fff"
    },
    optCard: {
        width: 110,
        height: 110,
        borderRadius: 30,
        overflow: "hidden",
        borderWidth: 4,
        borderColor: "#eee",
        textAlign: "center",
        justifyContent: "flex-end"
    },
    optCardSmall: {
        width: 100,
        height: 90,
        borderWidth: 3,
    },
    optCardSelected: {
        borderColor: "red",
    }
})