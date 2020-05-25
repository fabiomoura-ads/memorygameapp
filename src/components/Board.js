import React from 'react'
import { View } from 'react-native'
import CardFlip from '../components/CardFlip'
import params from './../params'

export default props => {

    const countRows = props.board.length;
    const countColumn = props.board[0].length;
    const paramsBox = params.calculateBlockSizeWidthAndHeight(countRows, countColumn)

    const rows = props.board.map((row, r) => {
        const columns = row.map((column, c) => {
            return <CardFlip {...column}
                onOpen={() => props.onOpenSelect(r, c)}
                params={paramsBox}
                key={c} />
        })
        return <View key={r} style={{ flexDirection: "row", }} >{columns}</View>
    });

    return (
        <View>{rows}</View>
    )

}