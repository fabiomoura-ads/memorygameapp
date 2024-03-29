const createBoard = (rows, columns, opened) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: opened,
                image: null,
                idItemPair: null,
                idItem: null
            }
        })
    })
}

const spreadCards = (board, pathImage) => {
    const rows = board.length;
    const columns = board[0].length;
    const totalCards = rows * columns;

    let cardsIncludes = 0;
    let count = 0;
    const arNumImagesSorteds = [];
    const arIdItemSorteds = [];

    //-- add first image
    let numImage = parseInt(Math.random() * 19, 10)
    while (numImage == 0) {
        numImage = parseInt(Math.random() * 19, 10)
    }
    arNumImagesSorteds.push(numImage)

    while (cardsIncludes < totalCards) {
        const rowSel = parseInt(Math.random() * rows, 10);
        const columnSel = parseInt(Math.random() * columns, 10);

        if (count > 1) {

            numImage = parseInt(Math.random() * 19, 10)
            while (arNumImagesSorteds.includes(numImage) || numImage == 0) {
                numImage = parseInt(Math.random() * 19, 10)
            }
            arNumImagesSorteds.push(numImage)

            count = 0;
        }

        if (!board[rowSel][columnSel].image) {
            board[rowSel][columnSel].image = `${pathImage}/${numImage}.png`
            board[rowSel][columnSel].idItemPair = numImage

            let idItemSorted = parseInt(Math.random() * 1000, 10)
            while (arIdItemSorteds.includes(idItemSorted) || idItemSorted == 0) {
                idItemSorted = parseInt(Math.random() * 1000, 10)
            }
            arIdItemSorteds.push(idItemSorted)
            board[rowSel][columnSel].idItem = idItemSorted

            count++;
            cardsIncludes++;
        }
    }
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const closeBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field, opened: false }
        })
    })
}

const createCardBoard = (rows, column, pathImage, showOpenedCards) => {
    const board = createBoard(rows, column, showOpenedCards);
    spreadCards(board, pathImage)
    return board;
}


const fields = board => [].concat(...board);

const wonGame = board => fields(board).filter(item => !item.opened).length === 0

const getImage = (fullPathImage) => {

    switch (fullPathImage) {
        //--animals
        case "animals/1.png": return require('./images/animals/1.png')
        case "animals/2.png": return require('./images/animals/2.png')
        case "animals/3.png": return require('./images/animals/3.png')
        case "animals/4.png": return require('./images/animals/4.png')
        case "animals/5.png": return require('./images/animals/5.png')
        case "animals/6.png": return require('./images/animals/6.png')
        case "animals/7.png": return require('./images/animals/7.png')
        case "animals/8.png": return require('./images/animals/8.png')
        case "animals/9.png": return require('./images/animals/9.png')
        case "animals/10.png": return require('./images/animals/10.png')
        case "animals/11.png": return require('./images/animals/11.png')
        case "animals/12.png": return require('./images/animals/12.png')
        case "animals/13.png": return require('./images/animals/13.png')
        case "animals/14.png": return require('./images/animals/14.png')
        case "animals/15.png": return require('./images/animals/15.png')
        case "animals/16.png": return require('./images/animals/16.png')
        case "animals/17.png": return require('./images/animals/17.png')
        case "animals/18.png": return require('./images/animals/18.png')
        case "animals/19.png": return require('./images/animals/19.png')

        //--simbols
        case "simbols/1.png": return require('./images/simbols/1.png')
        case "simbols/2.png": return require('./images/simbols/2.png')
        case "simbols/3.png": return require('./images/simbols/3.png')
        case "simbols/4.png": return require('./images/simbols/4.png')
        case "simbols/5.png": return require('./images/simbols/5.png')
        case "simbols/6.png": return require('./images/simbols/6.png')
        case "simbols/7.png": return require('./images/simbols/7.png')
        case "simbols/8.png": return require('./images/simbols/8.png')
        case "simbols/9.png": return require('./images/simbols/9.png')
        case "simbols/10.png": return require('./images/simbols/10.png')
        case "simbols/11.png": return require('./images/simbols/11.png')
        case "simbols/12.png": return require('./images/simbols/12.png')
        case "simbols/13.png": return require('./images/simbols/13.png')
        case "simbols/14.png": return require('./images/simbols/14.png')
        case "simbols/15.png": return require('./images/simbols/15.png')
        case "simbols/16.png": return require('./images/simbols/16.png')
        case "simbols/17.png": return require('./images/simbols/17.png')
        case "simbols/18.png": return require('./images/simbols/18.png')
        case "simbols/19.png": return require('./images/simbols/19.png')

        //--cars
        case "cars/1.png": return require('./images/cars/1.png')
        case "cars/2.png": return require('./images/cars/2.png')
        case "cars/3.png": return require('./images/cars/3.png')
        case "cars/4.png": return require('./images/cars/4.png')
        case "cars/5.png": return require('./images/cars/5.png')
        case "cars/6.png": return require('./images/cars/6.png')
        case "cars/7.png": return require('./images/cars/7.png')
        case "cars/8.png": return require('./images/cars/8.png')
        case "cars/9.png": return require('./images/cars/9.png')
        case "cars/10.png": return require('./images/cars/10.png')
        case "cars/11.png": return require('./images/cars/11.png')
        case "cars/12.png": return require('./images/cars/12.png')
        case "cars/13.png": return require('./images/cars/13.png')
        case "cars/14.png": return require('./images/cars/14.png')
        case "cars/15.png": return require('./images/cars/15.png')
        case "cars/16.png": return require('./images/cars/16.png')
        case "cars/17.png": return require('./images/cars/17.png')
        case "cars/18.png": return require('./images/cars/18.png')
        case "cars/19.png": return require('./images/cars/19.png')

        //--emojis
        case "emojis/1.png": return require('./images/emojis/1.png')
        case "emojis/2.png": return require('./images/emojis/2.png')
        case "emojis/3.png": return require('./images/emojis/3.png')
        case "emojis/4.png": return require('./images/emojis/4.png')
        case "emojis/5.png": return require('./images/emojis/5.png')
        case "emojis/6.png": return require('./images/emojis/6.png')
        case "emojis/7.png": return require('./images/emojis/7.png')
        case "emojis/8.png": return require('./images/emojis/8.png')
        case "emojis/9.png": return require('./images/emojis/9.png')
        case "emojis/10.png": return require('./images/emojis/10.png')
        case "emojis/11.png": return require('./images/emojis/11.png')
        case "emojis/12.png": return require('./images/emojis/12.png')
        case "emojis/13.png": return require('./images/emojis/13.png')
        case "emojis/14.png": return require('./images/emojis/14.png')
        case "emojis/15.png": return require('./images/emojis/15.png')
        case "emojis/16.png": return require('./images/emojis/16.png')
        case "emojis/17.png": return require('./images/emojis/17.png')
        case "emojis/18.png": return require('./images/emojis/18.png')
        case "emojis/19.png": return require('./images/emojis/19.png')

        default:
            return require('./images/simbols/19.png')
    }

};

export { createCardBoard, getImage, cloneBoard, wonGame, closeBoard }