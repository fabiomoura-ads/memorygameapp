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
		
		const width = Dimensions.get('window').width - 70
		this.blockSizeWidth = Math.floor(width / columns )

		const totalHeight = Dimensions.get('window').height - 70
		const boardHeight = totalHeight * ( 1 - this.headerRatio )		
		this.blockSizeHeight = Math.floor(boardHeight / rows)

		return [ this.blockSizeWidth, this.blockSizeHeight]
	}

}

export default params;