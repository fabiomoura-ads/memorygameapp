import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default props => {

    return (
        <View style={styles.container}>

            <View style={styles.body}>
                <Text style={styles.title}>Informações Gerais</Text>
                <Text style={styles.desc}>O Memorizze Game é um aplicativo de jogo da memória voltado para todos os públicos, especialmente para pessoas que gostam de desafios e buscam exercitar sua memória e estimular seu raciocínio.</Text>
                <View style={styles.spaces}></View>
                <Text style={styles.title}>Modos do Jogo</Text>
                <Text style={styles.desc}>O Memorizze Game é composto atualmente por dois modos de jogo, sendo Modo Normal e Modo Competição.</Text>
                <Text style={styles.subtitle}>Modo Normal:
                    <Text style={styles.desc}> Nesse modo o usuário pode treinar a vontade sua capacidade de memória, exercitando e estimulando seu cerébro a cada partida jogada. </Text>
                </Text>
                <Text style={styles.subtitle}>Modo Competição:
                    <Text style={styles.desc}> Nesse modo é possível cadastrar até 5 jogadores que poderão competir entre si. Ganha o jogador que conseguir mais pontos na partida. O vencedor é recompensado com um troféu, sendo a quantidade de vitórias acumuladas ao longo das partidas, por nível de dificuldade.</Text>
                </Text>
                <View style={styles.spaces}></View>
                <Text style={styles.title}>Regra de pontuação</Text>
                <Text style={styles.desc}>Os pontos são calculados de acordo com a quantidade de tentativas jogadas para acerto do par de cartas, sendo distrubuídos da seguinte forma:</Text>
                <Text style={styles.desc}>10 pontos para acerto na primeira tentativa.</Text>
                <Text style={styles.desc}>8 pontos para acerto na segunda tentativa.</Text>
                <Text style={styles.desc}>6 pontos para acerto na terceira tentativa.</Text>
                <Text style={styles.desc}>4 pontos para acerto na quarta tentativa.</Text>
                <Text style={styles.desc}>2 pontos para acerto na quinta tentativa em diante.</Text>

            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "#ccc",
        backgroundColor: "#ffc77d"
    },
    body: {
        flex: 1,
        width: "90%",
        marginTop: 15,
        paddingHorizontal: 10
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "justify",
    },
    desc: {
        fontSize: 12,
        textAlign: "justify",
        fontWeight: "normal",
    },
    spaces: {
        paddingVertical: 8,
    },
    spacesSub: {
        paddingVertical: 4,
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
    }
})