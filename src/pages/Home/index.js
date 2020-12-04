import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';

export default props => {

    const countPlays = useRef(3);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.optionsMenu} onPress={() => {
                    props.navigation.navigate('Help')
                }}>
                    <Feather name="help-circle" size={24} color="#FFF" />
                </TouchableOpacity>
            ),
        });
    }, [props.navigation]);

    async function checkShowAdMob() {
        countPlays.current++;
        if (countPlays.current == 4) {
            countPlays.current = 0;
        }
    }

    async function toPlayer() {
        props.navigation.navigate('Player')
    }

    async function toGame() {
        props.navigation.navigate('PlayerNormal')
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Memorizze Game</Text>
            </View>

            <View style={styles.body}>

                <View style={styles.boxButton}>
                    <TouchableOpacity onPress={() => toPlayer()}>

                        <Text style={styles.buttonStart}>Modo Competição</Text>

                    </TouchableOpacity>
                </View>

                <View style={styles.boxButton}>
                    <TouchableOpacity onPress={() => toGame()}>

                        <Text style={styles.buttonStart}>Modo Normal</Text>

                    </TouchableOpacity>
                </View>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        borderColor: "#ccc",
        backgroundColor: "#ffc77d"
    },
    header: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    body: {
        flex: 1,
        width: "90%",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 50,
        textAlign: "center",
        fontWeight: "bold",
        fontStyle: "italic",
        color: "red",
    },
    textButton: {
        color: "#fff",
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 30,
        paddingBottom: 10
    },
    boxButton: {
        height: 70,
        width: "90%",
        backgroundColor: "red",
        borderColor: "#ccc",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    buttonStart: {
        fontSize: 30,
        color: "#ffc",
        fontStyle: "italic",
        fontWeight: "bold",
    },
    textInfoOption: {
        fontSize: 25,
        color: "#E8643C",
        fontStyle: "italic",
        marginBottom: 5,
    },
    containerOptions: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
    },
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
    optionsMenu: {
        marginRight: 10
    }





})