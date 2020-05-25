import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Image } from 'react-native'

const OptionLevel = props => (
    <TouchableOpacity onPress={() => props.onSelect(props.opt)}>
        <Text style={[styles.textOpt, props.selected.join('') == props.opt.join('') ? styles.textOptSelected : null]}>{props.opt.join(':')}</Text>
    </TouchableOpacity>
)

const OptionCard = props => (
    <TouchableOpacity onPress={() => props.onSelect(props.value)}>        
        <Text style={[styles.textOpt, props.selected == props.value ? styles.textOptSelected : null]}>{props.opt}</Text>
    </TouchableOpacity>
)

export default props => {

    const width = Dimensions.get('window').width / 2
    const height = Dimensions.get('window').height / 4

    const [optionLevel, setOptionLevel] = useState([4,3]);
    const [optionCard, setOptionCard] = useState('animals');
    
    function selectOptionLevel(opt) {
        setOptionLevel(opt)
    }

    function selectOptionCard(opt) {
        setOptionCard(opt)
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../images/bg_home.jpg')} style={{ width: "100%", height: "100%" }}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Jogo da Memória</Text>

                    <View style={styles.containerTextoSelecione}>
                        <Text style={styles.textoSelecione}>Selecione o nível do jogo</Text>
                    </View>

                    <View style={styles.containerOptionsLevel}>
                        <OptionLevel opt={[4, 3]} selected={optionLevel} onSelect={selectOptionLevel} />
                        <OptionLevel opt={[4, 4]} selected={optionLevel} onSelect={selectOptionLevel} />
                        <OptionLevel opt={[5, 4]} selected={optionLevel} onSelect={selectOptionLevel} />
                        <OptionLevel opt={[5, 5]} selected={optionLevel} onSelect={selectOptionLevel} />
                        <OptionLevel opt={[6, 5]} selected={optionLevel} onSelect={selectOptionLevel} />
                        <OptionLevel opt={[6, 6]} selected={optionLevel} onSelect={selectOptionLevel} />                    
                    </View>

                    <View style={styles.containerTextoSelecione}>
                        <Text style={styles.textoSelecione}>Selecione o tipo de cartas</Text>
                    </View>

                    <View style={styles.containerOptionsCard}>
                        <OptionCard opt={'Animais'} value={"animals"} selected={optionCard} onSelect={selectOptionCard} />
                        <OptionCard opt={'Símbolos'} value={"simbols"} selected={optionCard} onSelect={selectOptionCard} />
                        <OptionCard opt={'Carros'} value={"cars"} selected={optionCard} onSelect={selectOptionCard} />
                    </View>

                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Game', { optionLevel, optionCard })}>
                        <Text style={styles.buttonIniciar}> Iniciar jogo </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        borderColor: "#ccc"
    },
    header: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    textHeader: {
        fontSize: 40,
        textAlign: "center",
        fontWeight: "bold",
        color: "#00f",
    },
    textButton: {
        color: "#fff",
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 30,
        paddingBottom: 10
    },
    containerButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 30
    },
    buttonIniciar: {
        fontSize: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        color: "#ccd",
        backgroundColor: "red",
        borderColor: "#ccc",
        borderRadius: 30,
        fontStyle: "italic",
        fontWeight: "bold",
    },
    containerTextoSelecione: {
        marginTop: 50,
        marginBottom: 5,
    },
    textoSelecione: {
        fontSize: 16,
        color: "#ffa",
        fontStyle: "italic"
    },
    containerOptionsLevel: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
    },  
    containerOptionsCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },    
    textOpt: {
        borderColor: "red",
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderColor: "#ccc",
        backgroundColor: "#FF6347",
        fontSize: 16,
        color: "#F5DEB3",
        fontWeight: "bold",
    },
    textOptSelected: {
        backgroundColor: "red",
    }

})