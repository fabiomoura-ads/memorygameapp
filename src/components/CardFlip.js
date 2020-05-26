import React, { useRef } from 'react'
import { View, Text, StyleSheet, Animated, Image, TouchableWithoutFeedback } from 'react-native'
import { getImage } from '../functions'

export default props => {

    const [width, height] = props.params
    const requireImage = getImage(props.image);
    const animated = useRef(new Animated.Value(0)).current;

    const frontInterpolate = animated.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"]
    });

    const backInterpolate = animated.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"]
    })

    const frontAnimatedStyle = {
        transform: [
            { rotateY: frontInterpolate }
        ]
    }

    const backAnimatedStyle = {
        transform: [
            { rotateY: backInterpolate }
        ]
    }

    function openCard() {

        if (props.opened) return

        Animated.spring(animated, {
            toValue: 180,
            speed: 15
        }).start(({ finished }) => {
            props.onOpen(props.row, props.column)
        })

    }

    function fechaCard() {
        Animated.spring(animated, {
            toValue: 0,
            speed: 15
        }).start()
    }

    if (!props.opened) {
        fechaCard()
    } else {
        Animated.spring(animated, {
            toValue: 180,
            speed: 12            
        }).start()

    }

    return (

        <View style={[styles.container, { height, width }]}>

            <TouchableWithoutFeedback onPress={() => openCard()}>
                <View>
                    <Animated.View style={[styles.flipCard, { height, width }, frontAnimatedStyle]}>
                        <Image
                            style={{ width: width / 2, height: height / 2 }}
                            source={require('../images/default.png')}
                        />
                    </Animated.View>
                    <Animated.View style={[styles.flipCard, styles.flipCardBack, { height, width }, backAnimatedStyle]}>
                        <Image
                            style={{ width: width * 0.9, height: height * 0.9 }}
                            source={requireImage}
                        />
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>

        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        margin: 3,
        backgroundColor: '#ffc77d'
    },
    flipCard: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
        backfaceVisibility: "hidden"

    },
    flipCardBack: {
        position: "absolute",
    },
    flipText: {
        width: 90,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
})
