import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, AsyncStorage } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { createCardBoard, wonGame, closeBoard } from './../../functions'
import Board from '../../components/Board'
import { BannerAdMobBanner } from '../../components/BannerAdMob'
import params from '../../params';

const Relogio = props => {

    //const [time, setTime] = useState(props.time)
    //const idIntervalRef = useRef(0);

    /*function retornaDataFormatada() {
        let data = new Date(time);
        return data.getHours().toString().padStart(2, '0') + ":" + data.getMinutes().toString().padStart(2, '0') + ":" + data.getSeconds().toString().padStart(2, '0')
    }

    useEffect(() => {
        schedullerTimer()

        return function () {
            setTime(time.setHours(0, 0, 0, 0))
            clearInterval(idIntervalRef.current)
        }

    }, [])

    function schedullerTimer() {
        const idInterval = setInterval(() => {
            setTime(time.setSeconds(time.getSeconds() + 1))
        }, 1000)

        idIntervalRef.current = idInterval;
    }

    useEffect(() => {
        if (props.finishGame) {
            clearInterval(idIntervalRef.current)
            idIntervalRef.current = null;
        } else if (!idIntervalRef.current) {
            schedullerTimer()
        }
    }, [time])*/

    return (
        <View style={styles.headerTime}>
            <Text style={styles.textHeaderTime}>Pontos: {props.pointsGame} </Text>
            { /*<Text style={styles.textHeaderTime}>Tempo: {retornaDataFormatada()}</Text> */}
        </View>
    )
}

export default props => {

    const PLAYERS_STORAGA_NAME = params.payerStorageName
    const RANKINGS_STORAGA_NAME = params.rankingsStorageName
    const isModeCompete = props.route.params.modeCompete || null

    const optionLevel = props.route.params.optionLevel.join(":").toString()

    const [rows, columns] = props.route.params.optionLevel
    const showPreview = props.route.params.optionPreview
    const pathImage = props.route.params.optionCard

    const [board, setBoard] = useState([[]]);
    const [finishGame, setFinishGame] = useState(false);
    const [gameInitialized, setGameInitialized] = useState((showPreview ? false : true));

    const dataBase = new Date();
    dataBase.setHours(0, 0, 0, 0);
    const dataGame = useRef(dataBase).current;

    const players = props.route.params.players || []
    const clonePlayers = useRef([...players]).current
    const playerCurrent = useRef({ position: 0 }).current
    const countAttempts = useRef({ value: 0 }).current;
    const pointsGame = useRef({ value: 0 }).current;
    const [rankings, setRankings] = useState([[]]);

    const selecteds = [];

    useEffect(() => {
        async function loadRankings() {
            const rankingsStorage = await AsyncStorage.getItem(RANKINGS_STORAGA_NAME);
            try {
                if (rankingsStorage) {
                    let objRankings = JSON.parse(rankingsStorage)
                    if (!objRankings.length) {
                        objRankings.push({ id: optionLevel, players: [] })
                    } else if (objRankings.filter(level => level.id == optionLevel).length === 0) {
                        objRankings.push({ id: optionLevel, players: [] })
                    }
                    setRankings(objRankings);
                }
            } catch (e) { console.log("ERRO loadRankings GAME >>> " + e) }

        }

        if (isModeCompete) {
            loadRankings();
        }
        newGame(showPreview, true)
        dataGame.setHours(0, 0, 0, 0)
    }, [])

    function startGame() {
        const newBoard = closeBoard(board)
        setBoard(newBoard)
        setGameInitialized(true);
    }

    function newGame(showOpenedCards, firstPlayer) {
        // \nTempo: ${ dataGame.getMinutes() ? dataGame.getMinutes() + ' minutos e ' : ''} ${dataGame.getSeconds()} segundos
        let msg = ""
        let hasNextGame = false
        if (!firstPlayer) {
            msg = `Partida encerrada!             
            \nPontos: ${ pointsGame.value} \n\n`
        }

        if (isModeCompete) {
            if (players instanceof Array && players[playerCurrent.position] != null) {
                msg += `\nIniciando partida do jogador ${players[playerCurrent.position].name} `
                hasNextGame = true
            } else {
                let winPlayer = calculeRanking();
                saveRanking(winPlayer)
                msg += `\npartida finalizada`
                props.navigation.dispatch(StackActions.pop(2));
            }

            Alert.alert("Atenção", msg,
                [{
                    text: "Ok", onPress: () => {

                        if (!hasNextGame) return
                        const newBoard = createCardBoard(rows, columns, pathImage, showOpenedCards)
                        selecteds.splice(0, selecteds.length)
                        countAttempts.value = 0
                        pointsGame.value = 0
                        dataGame.setHours(0, 0, 0, 0)
                        setBoard(newBoard)
                    }
                }],
                { cancelable: false }
            )
        } else {
            const newBoard = createCardBoard(rows, columns, pathImage, showOpenedCards)
            selecteds.splice(0, selecteds.length)
            countAttempts.value = 0
            pointsGame.value = 0
            dataGame.setHours(0, 0, 0, 0)
            setBoard(newBoard)
        }



    }

    function calculeRanking() {
        let winPlayer = { ...clonePlayers[0], victories: 0 }
        for (var i = 0; i < clonePlayers.length; i++) {
            if (clonePlayers[i].points > winPlayer.points) {
                winPlayer = clonePlayers[i]
            }
        }
        return winPlayer
    }

    async function saveRanking(winPlayer) {
        const newRankings = rankings.map(level => {
            if (level.id != optionLevel) {
                return { ...level }
            }
            if (!level.players.length) {
                winPlayer.victories = 1
                return { ...level, players: [winPlayer] }
            }

            if (level.players.filter(player => player.id == winPlayer.id).length === 0) {
                level.players.push(winPlayer)
            }

            let newPlayers = level.players.map(player => {
                if (player.id == winPlayer.id) {
                    return { ...player, victories: player.victories + 1 }
                } else {
                    return { ...player }
                }
            })

            return { ...level, players: newPlayers }
        })

        await AsyncStorage.setItem(RANKINGS_STORAGA_NAME, JSON.stringify(newRankings))
    }

    function refreshPoints() {
        switch (countAttempts.value) {
            case 1:
                pointsGame.value += 10
                break;
            case 2:
                pointsGame.value += 8
                break;
            case 3:
                pointsGame.value += 6
                break;
            case 4:
                pointsGame.value += 4
                break;
            default:
                pointsGame.value += 2
                break;
        }
        countAttempts.value = 0;
    }

    function onOpenSelect(row, column) {

        const selectedItem = board[row][column]
        selecteds.push(selectedItem)

        if (selecteds.length === 2) {

            countAttempts.value += 1;

            const idDoubleItem = selecteds[0].idDoubleItem;
            const equals = selecteds.filter(item => item.idDoubleItem === idDoubleItem).length === 2

            if (equals) {
                refreshPoints()
            }

            const newBoard = board.map(rows => {
                return rows.map(item => {
                    if (equals && item.idDoubleItem == idDoubleItem) {
                        return { ...item, opened: true }
                    } else {
                        return { ...item }
                    }
                })
            })

            selecteds.splice(0, selecteds.length);
            setBoard(newBoard);

            if (wonGame(newBoard)) {
                clonePlayers.forEach(player => {
                    if (player.id === players[playerCurrent.position].id) {
                        player.points = pointsGame.value
                        //player.time = (dataGame.getMinutes() * 60 + dataGame.getSeconds())
                    }
                })
                playerCurrent.position++;
                setFinishGame(true)
                newGame(showPreview);
            }
        }
    }

    return (
        <>
        <View style={styles.container}>
            {!gameInitialized
                ? <TouchableOpacity style={styles.containerNewGame} onPress={startGame}>
                    <Text style={styles.textNewGame}>Iniciar</Text>
                </TouchableOpacity>
                : <Relogio time={dataGame} pointsGame={pointsGame.value} finishGame={finishGame} />}
            <View style={styles.board}>
                <Board board={board} onOpenSelect={onOpenSelect} />
            </View>
        </View>
        <BannerAdMobBanner />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffc77d',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        width: "100%",
        alignItems: "center"
    },
    board: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    botton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        borderRadius: 4,
        marginLeft: 10,
    },
    textNewGame: {
        fontSize: 16,
        color: "#994c00",
        fontWeight: "bold"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    containerNewGame: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#eee",
        alignItems: "center",
        borderColor: "#eee",
        borderRadius: 5,
        borderWidth: 3,
    },
    headerTime: {
        backgroundColor: "#e0e0e0",
        borderLeftColor: "#ffcc99",
        borderTopColor: "#ffcc99",
        borderRightColor: "#ff9933",
        borderBottomColor: "#ff9933",
        flexDirection: "row",
        alignItems: "center",
        //paddingHorizontal: 5,
        //paddingVertical: 1,
        width: "90%",
        borderRadius: 2,
        borderWidth: 3,
        justifyContent: "space-around"
    },
    textHeaderTime: {
        fontSize: 16,
        color: "#994c00",
        fontWeight: "bold"
    }
});
