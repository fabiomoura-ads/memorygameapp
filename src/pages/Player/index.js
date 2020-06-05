import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Platform, FlatList, TextInput, Keyboard, Alert, ImageBackground } from 'react-native'
import { BannerAdMobBanner } from '../../components/BannerAdMob'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Option from '../../components/Option'
import Trofeu from '../../images/trofeu.png';
import params from '../../params';

const initialPlayer = { id: 0, name: '' }

export default props => {

    const PLAYERS_STORAGA_NAME = params.payerStorageName
    const RANKINGS_STORAGA_NAME = params.rankingsStorageName

    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState(initialPlayer);
    const [rankings, setRankings] = useState([]);

    const [optionLevel, setOptionLevel] = useState([4, 3]);
       
    useEffect(() => {
        loadPlayers();
    }, [])

    useEffect(() => {
        async function savePlayersStorage() {
            AsyncStorage.setItem(PLAYERS_STORAGA_NAME, JSON.stringify(players))
        }
        savePlayersStorage();
    }, [players])

    useEffect(() => {
        async function saveRankingsStorage() {
            AsyncStorage.setItem(RANKINGS_STORAGA_NAME, JSON.stringify(rankings))
        }

        saveRankingsStorage();
    }, [rankings])

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            loadRankings();
        });
        return unsubscribe;
    }, [props.navigation]);

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
        Alert.alert('Atenção!', 'Dados resetados!')
        loadPlayers();
        loadRankings()
        setPlayers([])
    }

    function selectOptionLevel(opt) {
        setOptionLevel(opt)
    }

    function addPlayer() {
        if (!newPlayer.name) return;

        if (players.length === 3) {
            Alert.alert(`Atenção!`, `Limite máximo de 3 jogadores!`)
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

    async function toCards() {
        const playersSelected = players.filter(player => player.checked)
        if ( !playersSelected.length ) {
            Alert.alert('Atenção!', 'Nenhum jogador foi selecionado.')
            return;
        }
        props.navigation.navigate('Cards', { optionLevel, playersSelected })
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

                        { players.length 
                            ? <Text style={styles.textTitle}>Jogadores</Text> 
                            : <Text style={[styles.textTitle, styles.textTitleBig]}>Nenhum jogador cadastrado</Text>  }
                        
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
                                                name={item.checked ? "checkcircle" : "checkcircleo"} size={25}
                                                color={item.checked ? "green" : "#ccc"} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => removePlayer(item)}>
                                            <MaterialIcons name="delete-forever" size={30} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )} />

                    </View>

                    <View style={styles.footer}>
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
                                <Ionicons name="ios-add" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => toCards()} onLongPress={() => resetData()}>
                            <Text style={styles.buttonStart}> Avançar </Text>
                        </TouchableOpacity>
                    </View>

                    { /* <BannerAdMobBanner /> */ }
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
        marginBottom: 35
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
    textTitleBig:{
        fontSize: 23,
        marginTop: 40
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
        backgroundColor: "#F2B277",
        marginBottom: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 2,
        height: 40,
        borderColor: "#ffc77d",
        borderBottomColor: "#F76301",
    },
    flatItemButtons: {
        flexDirection: "row",
        alignItems: "center"
    },
    flatItemText: {
        fontSize: 16,
        color: "#004",
        fontWeight: "bold",
        fontStyle: "italic",
        marginLeft: 5,
        textAlign: "center"

    },
    flatItemButton: {
        marginRight: 15
    },
    bgVictories: {
        width: 45,
        height: 40,
        resizeMode: 'stretch',
    },
    textCountVictories: {
        fontSize: 15,
        marginTop: 2,
        fontWeight: "bold",
        color: "green",
        textAlign: "center"
    },
    form: {
        padding: 8,
        height: 80,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        flexDirection: "row",
        paddingTop: 13,
        borderTopWidth: 1,
        borderColor: "#eee",
    },
    input: {
        height: 40,
        marginLeft: 30,
        backgroundColor: "#eee",
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#eee"
    },
    botton: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF5733",
        borderRadius: 4,
        marginLeft: 10,
    },


})