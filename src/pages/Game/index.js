import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { createCardBoard, wonGame, closeBoard } from './../../functions'
import Board from '../../components/Board'
import { BannerAdMobBanner } from '../../components/BannerAdMob'

const Relogio = props => {

    const [time, setTime] = useState(props.time)
    const idIntervalRef = useRef(0);

    function retornaDataFormatada() {
        let data = new Date(time);
        return data.getHours().toString().padStart(2, '0') + ":" + data.getMinutes().toString().padStart(2, '0') + ":" + data.getSeconds().toString().padStart(2, '0')
    }

    useEffect(() => {
        const idInterval = setInterval(() => {
            setTime(time.setSeconds(time.getSeconds() + 1))
        }, 1000)

        idIntervalRef.current = idInterval;

        return function () {
            setTime(time.setHours(0, 0, 0, 0))
            clearInterval(idIntervalRef.current)
        }

    }, [])

    useEffect(() => {
        if (props.finishGame) {
            clearInterval(idIntervalRef.current)
        }
    }, [time])

    return (
        <View style={styles.headerTime}>
            <Text style={styles.textHeaderTime}>Pontos: {props.pointsGame} </Text>
            <Text style={styles.textHeaderTime}>Tempo: {retornaDataFormatada()}</Text>
        </View>
    )
}

export default props => {

    const [rows, columns] = props.route.params.optionLevel
    const showPreview = props.route.params.optionPreview
    const pathImage = props.route.params.optionCard

    const [board, setBoard] = useState([[]]);
    const [finishGame, setFinishGame] = useState(false);
    const [gameInitialized, setGameInitialized] = useState((showPreview ? false : true));

    const dataBase = new Date();
    dataBase.setHours(0, 0, 0, 0);
    const dataGame = useRef(dataBase).current;

    const countAttempts = useRef({ value: 0 }).current;
    const pointsGame = useRef({ value: 0 }).current;

    const selecteds = [];

    useEffect(() => {
        newGame(showPreview)
        dataGame.setHours(0, 0, 0, 0)
    }, [])

    function startGame() {
        const newBoard = closeBoard(board)
        setBoard(newBoard)
        setGameInitialized(true);
    }

    function newGame(showOpenedCards) {
        const newBoard = createCardBoard(rows, columns, pathImage, showOpenedCards)
        selecteds.splice(0, selecteds.length)
        setBoard(newBoard)
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
                pointsGame.total += 4
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
                showMessageFinish()
                setFinishGame(true);
            }
        }
    }

    function showMessageFinish() {
        let msg = `Você venceu o jogo! 
        \nTempo: ${ dataGame.getMinutes() ? dataGame.getMinutes() + ' minutos e ': ''} ${dataGame.getSeconds()} segundos
        \nPontos: ${ pointsGame.value} `
        Alert.alert('Parabéns!', msg)
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
