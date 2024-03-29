import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { BannerAdMobBanner } from '../../components/BannerAdMob'
import { AdMobInterstitial } from 'expo-ads-admob'

const Option = props => {
    return <TouchableOpacity onPress={() => props.onSelect(props.value)}>
        {
            props.selected instanceof Array
                ? <Text style={[styles.textItemOption, (props.selected.join('') == props.value.join('')) ? styles.textOptSelected : null]}>{props.opt.join(':')}</Text>
                : <Text style={[styles.textItemOption, (props.selected.toString() == props.value.toString()) ? styles.textOptSelected : null]}>{props.opt}</Text>
        }
    </TouchableOpacity>
}

const isProduction = false;

export default props => {

    const [optionLevel, setOptionLevel] = useState([4, 3]);
    const [optionCard, setOptionCard] = useState('animals');
    const [optionPreview, setOptionPreview] = useState(false);
    const countPlays = useRef(0);

    useEffect(() => {
        async function load() {
            await AdMobInterstitial.setAdUnitID('ca-app-pub-3966719253606702/1496212326')
        }
        //load();
    })

    async function ShowAdMobInterstitial() {
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true })
        await AdMobInterstitial.showAdAsync();
    }

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
        countPlays.current++;
        if (countPlays.current == 3 && isProduction ) {
            await ShowAdMobInterstitial();
            countPlays.current = 0;
        }
        props.navigation.navigate('Game', { optionLevel, optionCard, optionPreview })
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Jogo da Memória</Text>
            </View>

            <View style={styles.body}>

                <Text style={styles.textInfoOption}>Nível do jogo</Text>
                <View style={styles.containerOptions}>
                    <Option opt={[4, 3]} value={[4, 3]} selected={optionLevel} onSelect={selectOptionLevel} />
                    <Option opt={[4, 4]} value={[4, 4]} selected={optionLevel} onSelect={selectOptionLevel} />
                    <Option opt={[5, 4]} value={[5, 4]} selected={optionLevel} onSelect={selectOptionLevel} />
                    <Option opt={[5, 5]} value={[5, 5]} selected={optionLevel} onSelect={selectOptionLevel} />
                    <Option opt={[6, 5]} value={[6, 5]} selected={optionLevel} onSelect={selectOptionLevel} />
                    <Option opt={[6, 6]} value={[6, 6]} selected={optionLevel} onSelect={selectOptionLevel} />
                </View>

                <Text style={styles.textInfoOption}>Tipo de cartas</Text>
                <View style={styles.containerOptions}>
                    <Option opt={'Animais'} value={"animals"} selected={optionCard} onSelect={selectOptionCard} />
                    <Option opt={'Símbolos'} value={"simbols"} selected={optionCard} onSelect={selectOptionCard} />
                    <Option opt={'Carros'} value={"cars"} selected={optionCard} onSelect={selectOptionCard} />
                </View>

                <Text style={styles.textInfoOption}>Pré-visualizar cartas?</Text>
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

            { isProduction ? <BannerAdMobBanner /> : false }

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