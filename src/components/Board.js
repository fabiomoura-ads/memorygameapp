import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CardFlip from '../components/CardFlip'
import params from './../params'

export default props => {

    const bRows = props.board.length;
    const bColumn = props.board[0].length;
    const paramsCard = params.calculateBlockSizeWidthAndHeight(bRows, bColumn)

    const rows = props.board.map((row, r) => {
        const columns = row.map((column, c) => {
            return <CardFlip {...column} 
                opened={column.opened}
                onOpen={() => props.onOpenSelect(r, c)} 
                params={paramsCard} 
                key={c} />
        })
        return <View key={r} style={{ flexDirection: "row", }} >{columns}</View>
    });

    return (
        <View>{rows}</View>
    )

}