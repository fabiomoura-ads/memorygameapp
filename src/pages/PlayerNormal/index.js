import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { BannerAdMobBanner } from '../../components/BannerAdMob'
import { AdMobInterstitial } from 'expo-ads-admob'
import Option from '../../components/Option'
import OptAnimals from '../../images/opt_animals.jpg'
import OptCars from '../../images/opt_cars.jpg'
import OptSocials from '../../images/opt_socials.jpg'
import OptEmojis from '../../images/opt_emojis.jpg'

export default props => {

    const [optionLevel, setOptionLevel] = useState([4, 3]);
    const [optionCard, setOptionCard] = useState('animals');
    const [optionPreview, setOptionPreview] = useState(false);
    const countPlays = useRef(0);

    function selectOptionLevel(opt) {
        setOptionLevel(opt)
    }
    function selectOptionCard(opt) {
        setOptionCard(opt)
    }
    function selectOptionPreview(opt) {
        setOptionPreview(opt)
    }

    async function toGame() {
        props.navigation.navigate('Game', { optionLevel, optionCard, optionPreview })
    }

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <Text style={styles.textTitle}>Nível do jogo</Text>
                <View style={styles.containerOptions}>
                    <Option opt={[4, 3]} value={[4, 3]} selected={optionLevel} onSelect={selectOptionLevel} />
                    <Option opt={[4, 4]} value={[4, 4]} selected={optionLevel} onSelect={selectOptionLevel} />
                    <Option opt={[5, 4]} value={[5, 4]} selected={optionLevel} onSelect={selectOptionLevel} />
                    <Option opt={[5, 5]} value={[5, 5]} selected={optionLevel} onSelect={selectOptionLevel} />
                    <Option opt={[6, 5]} value={[6, 5]} selected={optionLevel} onSelect={selectOptionLevel} />
                    <Option opt={[6, 6]} value={[6, 6]} selected={optionLevel} onSelect={selectOptionLevel} />
                </View>

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
                <TouchableOpacity onPress={() => toGame()}>
                    <Text style={styles.buttonStart}> Iniciar jogo </Text>
                </TouchableOpacity>
            </View>

            <BannerAdMobBanner />

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
        flex: 3,
        alignItems: "center",
        justifyContent: "space-around",
    },
    footer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5
    },
    textTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#E8643C",
        marginBottom: 2,
        marginTop: 10

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
    textInfoOption: {
        fontSize: 20,
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
    containerOptionsImg: {
        width: "70%",
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





})