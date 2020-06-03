import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Platform, FlatList, TextInput, Keyboard, Alert, ImageBackground } from 'react-native'
import { BannerAdMobBanner } from '../../components/BannerAdMob'
import { AdMobInterstitial } from 'expo-ads-admob'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Option from '../../components/Option'
import Trofeu from '../../images/trofeu.png';
import params from '../../params';

const isProduction = false;

const initialPlayer = { id: 0, name: '' }

export default props => {

    const PLAYERS_STORAGA_NAME = params.payerStorageName
    const RANKINGS_STORAGA_NAME = params.rankingsStorageName

    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState(initialPlayer);
    const [rankings, setRankings] = useState([]);

    const [optionLevel, setOptionLevel] = useState([4, 3]);
    const [optionCard, setOptionCard] = useState('animals');
    const [optionPreview, setOptionPreview] = useState(false);

    const countPlays = useRef(0);

    useEffect(() => {
        loadRankings();
        loadPlayers();
    }, [])

    useEffect(() => {
        async function saveStorage() {
            AsyncStorage.setItem(PLAYERS_STORAGA_NAME, JSON.stringify(players))
        }
        saveStorage();
    }, [players])

    useEffect(() => {
        async function saveStorage() {
            AsyncStorage.setItem(RANKINGS_STORAGA_NAME, JSON.stringify(rankings))
        }

        saveStorage();
    }, [rankings])

    useEffect(() => {
        async function load() {
            await AdMobInterstitial.setAdUnitID('ca-app-pub-3966719253606702/1496212326')
        }
        //load();
    })

    async function loadRankings() {
        const rankingsStorage = await AsyncStorage.getItem(RANKINGS_STORAGA_NAME);
        if (rankingsStorage) {
            setRankings(JSON.parse(rankingsStorage));
        }
    }

    async function loadPlayers() {
        const playersStorage = await AsyncStorage.getItem(PLAYERS_STORAGA_NAME);
        if (playersStorage) {
            setPlayers(JSON.parse(playersStorage));
        }
    }

    function resetData() {
        AsyncStorage.removeItem(PLAYERS_STORAGA_NAME)
        AsyncStorage.removeItem(RANKINGS_STORAGA_NAME)
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

    async function ShowAdMobInterstitial() {
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true })
        await AdMobInterstitial.showAdAsync();
    }

    function addPlayer() {
        if (!newPlayer.name) return;

        if (players.length === 3) {
            Alert.alert(`Atenção!`, `Já existe o limite máximo de jogadores cadastrados!`)
            return;
        }

        const exists = players.filter(player => player.name.toString() === newPlayer.name.toString()).length !== 0
        if (exists) {
            Alert.alert(`Atenção!`, `Jogador "${newPlayer.name}" já cadastrado!`)
        } else {
            setPlayers([...players, { ...newPlayer, id: new Date().getTime() }])
            setNewPlayer(initialPlayer);
            Keyboard.dismiss();
        }

    }

    function selectPlayer(item) {
        const playersUpdate = players.map(player => {
            if (player.id === item.id) {
                return { ...player, checked: !item.checked }
            } else {
                return { ...player }
            }
        })
        setPlayers(playersUpdate)
    }

    function removePlayer(item) {
        Alert.alert("Deletar", "Tem certeza que deseja remover esse jogador?",
            [{ text: "Cancelar", onPress: () => { return }, style: "cancel" },
            {
                text: "Ok", onPress: () => {
                    setPlayers(players.filter(player => player.id !== item.id))
                    removePlayerRankings(item)
                }
            },
            ],
            { cancelable: false }
        )
    }

    function removePlayerRankings(item) {
        const newRankings = rankings.map(level => {
            if (!level.players.length) {
                return { ...level }
            }
            const newPlayers = level.players.filter(player => player.id != item.id)

            return { ...level, players: newPlayers }
        })

        setRankings(newRankings)
    }

    async function toGame() {
        countPlays.current++;
        if (countPlays.current == 3 && isProduction) {
            await ShowAdMobInterstitial();
            countPlays.current = 0;
        }
        props.navigation.navigate('Game', { optionLevel, optionCard, optionPreview, players, onLoadingRankings: loadRankings })
    }

    function getVictories(player) {
        const idOptionLevel = optionLevel.join(':').toString();
        const rankingLevel = rankings.filter(level => level.id == idOptionLevel)

        if (rankingLevel.length === 0) return

        let victories = 0;
        rankingLevel[0].players.map(p => {
            if (p.id == player.id) {
                victories = p.victories
            }
        })
        return victories;
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

                        <Text style={styles.textTitle}>Nível do jogo</Text>
                        <View style={styles.containerOptions}>
                            <Option opt={[4, 3]} value={[4, 3]} selected={optionLevel} onSelect={selectOptionLevel} />
                            <Option opt={[4, 4]} value={[4, 4]} selected={optionLevel} onSelect={selectOptionLevel} />
                            <Option opt={[5, 4]} value={[5, 4]} selected={optionLevel} onSelect={selectOptionLevel} />
                            <Option opt={[5, 5]} value={[5, 5]} selected={optionLevel} onSelect={selectOptionLevel} />
                            <Option opt={[6, 5]} value={[6, 5]} selected={optionLevel} onSelect={selectOptionLevel} />
                            <Option opt={[6, 6]} value={[6, 6]} selected={optionLevel} onSelect={selectOptionLevel} />
                        </View>

                        <Text style={styles.textTitle}>Hanking</Text>

                        <FlatList
                            style={styles.flatList}
                            data={players}
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={styles.flatItem}>
                                    <Text style={styles.flatItemText}>{item.name}</Text>
                                    {
                                        getVictories(item)
                                            ?
                                            <ImageBackground style={styles.bgVictories} source={Trofeu} >
                                                <Text style={styles.textCountVictories}>{getVictories(item)}x</Text>
                                            </ImageBackground>
                                            : false}
                                    <View style={styles.flatItemButtons}>
                                        <TouchableOpacity
                                            style={styles.flatItemButton}
                                            onPress={() => selectPlayer(item)}>
                                            <AntDesign
                                                name={item.checked ? "checkcircle" : "checkcircleo"} size={20}
                                                color={item.checked ? "green" : "silver"} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => removePlayer(item)}>
                                            <MaterialIcons name="delete-forever" size={25} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )} />

                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#999"
                                autoCorrect={true}
                                placeholder="Adicione um novo jogador"
                                maxLength={25}
                                value={newPlayer.name}
                                onChangeText={(name) => setNewPlayer({ name })} />
                            <TouchableOpacity style={styles.botton} onPress={addPlayer}>
                                <Ionicons name="ios-add" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.textTitle}>Tipo de cartas</Text>
                        <View style={styles.containerOptions}>
                            <Option opt={'Animais'} value={"animals"} selected={optionCard} onSelect={selectOptionCard} />
                            <Option opt={'Símbolos'} value={"simbols"} selected={optionCard} onSelect={selectOptionCard} />
                            <Option opt={'Carros'} value={"cars"} selected={optionCard} onSelect={selectOptionCard} />
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

                    {isProduction ? <BannerAdMobBanner /> : false}
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
        fontSize: 16,
        fontWeight: "bold",
        color: "#E8643C",
        marginBottom: 2,
        marginTop: 10
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