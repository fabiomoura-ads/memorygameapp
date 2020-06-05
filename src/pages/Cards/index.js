import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Platform, FlatList, TextInput, Keyboard, Alert, ImageBackground } from 'react-native'
import { BannerAdMobBanner } from '../../components/BannerAdMob'
import { AdMobInterstitial } from 'expo-ads-admob'
import Option from '../../components/Option'
import OptAnimals from '../../images/opt_animals.jpg'
import OptCars from '../../images/opt_cars.jpg'
import OptSocials from '../../images/opt_socials.jpg'
import OptEmojis from '../../images/opt_emojis.jpg'

export default props => {

    const optionLevel = props.route.params.optionLevel;
    const players = props.route.params.playersSelected;

    const [optionCard, setOptionCard] = useState('animals');
    const [optionPreview, setOptionPreview] = useState(false);

    const countPlays = useRef(0);

    useEffect(() => {
        async function load() {
            await AdMobInterstitial.setAdUnitID('ca-app-pub-3966719253606702/1496212326')
        }
        load();
    })

    function selectOptionCard(opt) {
        setOptionCard(opt)
    }
    function selectOptionPreview(opt) {
        setOptionPreview(opt)
    }

    async function ShowAdMobInterstitial() {
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true })
        await AdMobInterstitial.showAdAsync();
    }

    async function toGame() {
        countPlays.current++;
        if (countPlays.current == 10 ) {
            await ShowAdMobInterstitial();
            countPlays.current = 0;
        }
        props.navigation.navigate('Game', { optionLevel, optionCard, optionPreview, players, modeCompete: true})
    }

    return (
        <>
            <KeyboardAvoidingView
                keyboardVerticalOffset={0}
                behavior="padding"
                style={{ flex: 1 }}
                enabled={Platform.OS === 'ios'}>
                <View style={styles.container}>
                    <View style={styles.body}>

                        <Text style={styles.textTitle}>Tipo de cartas</Text>
                        <View style={[styles.containerOptions, styles.containerOptionsImg]}>

                            <Option opt={'Animais'} value={"animals"} selected={optionCard} onSelect={selectOptionCard} isImg={true} source={OptAnimals} />
                            <Option opt={'Carros'} value={"cars"} selected={optionCard} onSelect={selectOptionCard} isImg={true} source={OptCars} />

                        </View>

                        <View style={[styles.containerOptions, styles.containerOptionsImg]}>

                            <Option opt={'Símbolos'} value={"simbols"} selected={optionCard} onSelect={selectOptionCard} isImg={true} source={OptSocials} />
                            <Option opt={'Emojis'} value={"emojis"} selected={optionCard} onSelect={selectOptionCard} isImg={true} source={OptEmojis} />

                        </View>

                        <Text style={styles.textTitle}>Pré-visualizar cartas?</Text>
                        <View style={styles.containerOptions}>
                            <Option opt={'Sim'} value={true} selected={optionPreview} onSelect={selectOptionPreview} />
                            <Option opt={'Não'} value={false} selected={optionPreview} onSelect={selectOptionPreview} />
                        </View>

                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => toGame()} onLongPress={() => resetData()}>
                            <Text style={styles.buttonStart}> Iniciar jogo </Text>
                        </TouchableOpacity>
                    </View>

                    <BannerAdMobBanner />
                </View>
            </KeyboardAvoidingView>
        </>
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
        flex: 3,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
    },
    footer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5
    },
    title: {
        fontSize: 35,
        textAlign: "center",
        fontWeight: "bold",
        color: "red",
    },
    textButton: {
        color: "#fff",
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 30,
        paddingBottom: 10
    },
    buttonStart: {
        fontSize: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        color: "#ffc",
        backgroundColor: "red",
        borderColor: "#ccc",
        borderRadius: 30,
        fontStyle: "italic",
        fontWeight: "bold",
    },
    textTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#E8643C",
        marginBottom: 5,
        marginTop: 10
    },
    containerOptions: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
    },
    containerOptionsImg: {
        width: "80%",
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
    flatList: {
        flex: 1,
        width: "90%",
        marginTop: 1,
        padding: 2,
    },
    flatItem: {
        backgroundColor: "#ffc77d",
        marginBottom: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        //paddingBottom: 13,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#eee"
    },
    flatItemButtons: {
        flexDirection: "row",
        alignItems: "center"
    },
    flatItemText: {
        fontSize: 14,
        color: "#333",
        fontWeight: "bold",
        marginLeft: 3,
        textAlign: "center"

    },
    flatItemButton: {
        marginRight: 20
    },
    bgVictories: {
        width: 30,
        height: 35,
        resizeMode: 'stretch',
    },
    textCountVictories: {
        fontSize: 12,
        marginTop: 1,
        fontWeight: "bold",
        color: "green",
        textAlign: "center"
    },
    form: {
        padding: 8,
        height: 80,
        justifyContent: "center",
        alignSelf: "stretch",
        flexDirection: "row",
        paddingTop: 13,
        borderTopWidth: 1,
        borderColor: "#eee",
    },
    input: {
        height: 40,
        backgroundColor: "#eee",
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#eee"
    },
    botton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF5733",
        borderRadius: 4,
        marginLeft: 10,
    },



})