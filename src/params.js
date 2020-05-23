import { Dimensions } from 'react-native'

const params = {
    blockSizeWidth: 100,
    blockSizeHeight: 130,
	borderSize: 1,
	fontSize: 15,
	headerRatio: 0.25,
	difficultLevel: 0.1,
	getColumnsAmount(){
		const width = Dimensions.get('window').width
		console.log("GET>> " + this.blockSizeWidth )
		console.log("CAL" + Math.floor(width / this.blockSizeWidth))
		return Math.floor(width / this.blockSizeWidth)
	},
	getRowsAmount(){
		const totalHeight = Dimensions.get('window').height
		const boardHeight = totalHeight * ( 1 - this.headerRatio )
		return Math.floor(boardHeight / this.blockSizeHeight)
	},
	calculateBlockSizeWidthAndHeight(rows, columns){
		
		const width = Dimensions.get('window').width - 50
		this.blockSizeWidth = Math.floor(width / columns )
		//console.log("largura total " + width + " qtd colunas " + columns + " largura / colunas " + this.blockSizeWidth)

		const totalHeight = Dimensions.get('window').height
		const boardHeight = totalHeight * ( 1 - this.headerRatio )		
		this.blockSizeHeight = Math.floor(boardHeight / rows)
		//console.log("altura total " + totalHeight + " qtd linhas " + rows + " algura / linhas " + this.blockSizeHeight)

		return [ this.blockSizeWidth, this.blockSizeHeight]
	}

}

export default params;