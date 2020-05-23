import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Alert, TouchableWithoutFeedback } from 'react-native'
import { getPathImage } from '../functions'
import PubSub from 'pubsub-js';

export default props => {

    const [width, height] = props.params
    const imageRequire = getPathImage(props.pathImage);
    let valueCurrent = 0;

    const animated = useRef(new Animated.Value(0)).current;
    animated.addListener(({ value }) => {
        valueCurrent = value
    })

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

    useEffect(() => {
        fechaCard();
        PubSub.subscribe('cards-open', function (topico, cardsOpen) {
            cardsOpen.map(item => {
                if (props.row == item.row && props.column == item.column) {
                    if (!item.opened) {
                        setTimeout(function () {
                            fechaCard()
                        }, 1200);
                    }
                }
            })
        })
    }, [])

    function fechaCard() {
        Animated.spring(animated, {
            toValue: 0,
            friction: 8,
            tension: 10
        }).start()
    }

    function abreCard() {

        if (props.opened) {
            return;
        }

        Animated.spring(animated, {
            toValue: 180,
            friction: 8,
            tension: 10
        }).start()

        props.onOpen(props.row, props.column)

    }

    return (


        <View style={[styles.container, { height, width }]}>

            <TouchableWithoutFeedback onPress={() => abreCard()}>
                <View>
                    <Animated.View style={[styles.flipCard, { height, width }, frontAnimatedStyle]}>
                        <Image
                            style={{ width: width / 2, height: height/2}}
                            source={require('../images/default.png')}
                        />
                    </Animated.View>
                    <Animated.View style={[styles.flipCard, styles.flipCardBack, { height, width }, backAnimatedStyle]}>
                        <Image
                            style={{ width: width * 0.95, height: height * 0.95 }}
                            source={imageRequire}
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
        //backgroundColor: "blue"
    },
    flipCard: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
        backfaceVisibility: "hidden"

    },
    flipCardBack: {
        backgroundColor: "red",
        position: "absolute",
    },
    flipText: {
        width: 90,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
})
