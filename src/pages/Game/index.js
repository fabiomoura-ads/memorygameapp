import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, AsyncStorage } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { createCardBoard, wonGame, closeBoard } from './../../functions'
import Board from '../../components/Board'
import params from '../../params';

const Relogio = props => {

    return (
        <View style={styles.headerTime}>
            <Text style={styles.textHeaderTime}>Pontos: {props.pointsGame} </Text>
        </View>
    )
}

export default props => {

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

    const pairSelected = [];

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
        let msg = ""
        let hasNextGame = false
        let title = 'Início do Jogo!';
        if (!firstPlayer) {
            msg = `\nVocê Ganhou: ${pointsGame.value} pontos.\n\n`
            title = 'Parabéns!'
        }

        if (isModeCompete) {
            if (players instanceof Array && players[playerCurrent.position] != null) {
                msg += `\nIniciando partida do jogador: ${players[playerCurrent.position].name} `
                hasNextGame = true
            } else {
                title = 'Fim do Jogo!'
                const winners = calculeteRanking();
                saveRanking(winners)

                msg += `\nJogo finalizado!`
                if (winners.length > 1) {
                    let winnersNames = winners.map(w => w.name);
                    msg += ` Houve empate!`
                    msg += `\nJogadores ${winnersNames.join(' - ')} são os vencedores!!!`
                } else {
                    msg += `\nJogador ${winners[0].name} foi o vencedor!!!`
                }
                props.navigation.dispatch(StackActions.pop(2));
            }

            Alert.alert(title, msg,
                [{
                    text: "Ok", onPress: () => {

                        if (!hasNextGame) return
                        const newBoard = createCardBoard(rows, columns, pathImage, showOpenedCards)
                        pairSelected.splice(0, pairSelected.length)
                        countAttempts.value = 0
                        pointsGame.value = 0
                        dataGame.setHours(0, 0, 0, 0)
                        if (showPreview) {
                            setGameInitialized(false);
                        }

                        setBoard(newBoard)
                    }
                }],
                { cancelable: false }
            )
        } else {
            if (firstPlayer) {
                const newBoard = createCardBoard(rows, columns, pathImage, showOpenedCards)
                pairSelected.splice(0, pairSelected.length)
                countAttempts.value = 0
                pointsGame.value = 0
                dataGame.setHours(0, 0, 0, 0)
                setBoard(newBoard)
            } else {
                Alert.alert('Parabéns!', `\nVocê venceu a partida com: ${pointsGame.value} pontos.\n\nJogue novamente!`)
                props.navigation.dispatch(StackActions.pop(1));
            }
        }

    }

    //--TODO REVISAR PARA CASO DE EMPATE
    function calculeteRanking() {

        const maxPoint = clonePlayers.reduce((prev, current) => (prev.points > current.points) ? prev : current).points;

        const winners = clonePlayers.filter(p => p.points == maxPoint);

        return winners

    }

    async function saveRanking(winners) {

        const newRankings = rankings.map(level => {

            if (level.id != optionLevel) {
                return { ...level }
            }

            //-- se vazio adiciona todos os vencedores
            if (!level.players.length) {

                let winnersLevel = winners.map(winner => {
                    return { ...winner, victories: 1 }
                })

                return { ...level, players: winnersLevel }
            }

            //-- se não for vazio, atualiza vitorias dos jogadores
            winners.forEach(winner => {

                if (level.players.filter(player => player.id == winner.id).length === 0) {
                    level.players.push({ ...winner, victories: 0 })
                }

            })

            let newPlayers = level.players.map(player => {

                //--se o jogador já existir nos players incrementa vitórias, senão só copia o jogador
                if (winners.filter(winner => winner.id == player.id).length === 1) {
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

        if ( pairSelected.filter(p => p.idItem == selectedItem.idItem ).length == 0 ) {
            pairSelected.push(selectedItem)
        }

        if (pairSelected.length === 2) {

            countAttempts.value += 1;
    
            const equals = pairSelected.reduce((prev, current) => ( prev.idItemPair == current.idItemPair && prev.idItem != current.idItem ) )

            if (equals) {
                refreshPoints()
            }

            const newBoard = board.map(rows => {
                return rows.map(item => {
                    if (equals && item.idItemPair == pairSelected[0].idItemPair) {
                        return { ...item, opened: true }
                    } else {
                        return { ...item }
                    }
                })
            })

            pairSelected.splice(0, pairSelected.length);
            setBoard(newBoard);

            if (wonGame(newBoard)) {
                clonePlayers.forEach(player => {
                    if (player.id === players[playerCurrent.position].id) {
                        player.points = pointsGame.value
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