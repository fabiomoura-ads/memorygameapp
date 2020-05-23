import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { createCardBoard, closeAllCards, cloneBoard, checkCardsEquals, closeCards } from './src/functions'
import Board from './src/components/Board'
import PubSub from 'pubsub-js';

const selecteds = []

export default function App() {

  const [board, setBoard] = useState([[]]);

  const rows = 5; //params.getRowsAmount();
  const columns = 4; //params.getColumnsAmount()

  useEffect(() => {
    let newBoard = (createCardBoard(rows, columns, "simbols"));
    closeAllCards(newBoard);
    setBoard(newBoard);
  }, [])

  useEffect(() => {
    let cardsOpen = [];
    board.forEach(r => {
      r.forEach(c => {
        cardsOpen.push(c);
      })
    })

    PubSub.publish('cards-open', cardsOpen)

  }, [board])

  function onOpenSelect(row, column, ) {
    let newBoard = cloneBoard(board);
    newBoard[row][column].opened = true;

    const selectedItem = newBoard[row][column].pathImage;

    if (!selecteds.length) {
      selecteds.push(selectedItem)
    } else if (selecteds.length == 1 && selecteds.includes(selectedItem)) {
      selecteds.splice(0, selecteds.length)
    } else {
      selecteds.push(selectedItem)
      newBoard = closeCards(newBoard, selecteds)
      selecteds.splice(0, selecteds.length)
    }

    setBoard(newBoard);
  }

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        <Board board={board} onOpenSelect={onOpenSelect} />
      </View>
    </View>
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
  }
});
