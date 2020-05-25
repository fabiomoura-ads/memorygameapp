import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, Alert } from 'react-native';
import { createCardBoard, wonGame } from './../../functions'
import Board from '../../components/Board'

export default props => {

    const [board, setBoard] = useState([[]]);
    const [rows, columns] = props.route.params.optionLevel
    const pathImage = props.route.params.optionCard
    const selecteds = [];

    useEffect(() => {
        newGame();
    }, [])

    function newGame() {
        const newBoard = createCardBoard(rows, columns, pathImage)
        selecteds.splice(0, selecteds.length)
        setBoard(newBoard)
    }

    function onOpenSelect(row, column) {

        const selectedItem = board[row][column]
        selecteds.push(selectedItem)

        if (selecteds.length === 2) {

            const idDoubleItem = selecteds[0].idDoubleItem;
            const equals = selecteds.filter(item => item.idDoubleItem === idDoubleItem).length === 2

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

            if (wonGame(newBoard)) {
                Alert.alert('Parabéns!', 'Você venceu o jogo!')
                setTimeout(() => props.navigation.goBack(), 1500)
            }

            setBoard(newBoard);
        }
    }



    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={(require('../../images/bg.jpg'))} style={{ width: '100%', height: '100%' }} >
                    <View style={styles.board}>
                        <Board board={board} onOpenSelect={onOpenSelect} />
                    </View>
                </ImageBackground>
            </View>
            {/*<TouchableOpacity style={styles.containerNewGame} onPress={newGame}>
                <Text style={styles.textNewGame}>New Game</Text>
    </TouchableOpacity>*/}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    board: {
        alignItems: "center",
        justifyContent: "center"
    },
    form: {
        padding: 8,
        height: 80,
        justifyContent: "center",
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
        backgroundColor: "blue",
        borderRadius: 4,
        marginLeft: 10,
    },
    containerNewGame: {
        flex: 0.05,
        marginBottom: 5,
        paddingVertical: 5,
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#eee",
        alignItems: "center",
        borderColor: "#eee",
        borderWidth: 2,
        borderRadius: 40
    },
    textNewGame: {
        fontSize: 20,
        fontWeight: "bold",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
});
