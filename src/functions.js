const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                image: null,
                idDoubleItem: null
            }
        })
    })
}

const spreadCards = (board, pathImage) => {
    const rows = board.length;
    const columns = board[0].length;
    const totalCards = rows * columns;

    let cardsIncludes = 0;
    let idDoubleItem = 1;
    let count = 0;

    while (cardsIncludes < totalCards) {
        const rowSel = parseInt(Math.random() * rows, 10);
        const columnSel = parseInt(Math.random() * columns, 10);

        if (count > 1) {
            idDoubleItem++;
            count = 0;
        }

        if (!board[rowSel][columnSel].image) {
            board[rowSel][columnSel].image = `${pathImage}/${idDoubleItem}.png`
            board[rowSel][columnSel].idDoubleItem = idDoubleItem
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

const closeAllCards = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field, opened: false }
        })
    })
}

const closeCards = (board, arIdDoubleItem) => {
    return board.map(rows => {
        return rows.map(field => {
            if (arIdDoubleItem.includes(field.idDoubleItem)) {
                return { ...field, opened: false }
            } else {
                return { ...field }
            }
        })
    })
}

const createCardBoard = (rows, column, pathImage) => {
    const board = createBoard(rows, column);
    spreadCards(board, pathImage)
    return board;
}

const fields = board => [].concat(...board);

const checkCardsEquals = (board, select) => fields(board).filter(field => (field.opened && field.image == select)).length == 2;

const wonGame = board => fields(board).filter(item => !item.opened).length === 0

const getImage = (fullPathImage) => {
    
    switch (fullPathImage) {
        //--animals
        case "animals/1.png": return require('./images/animals/1.jpg')
        case "animals/2.png": return require('./images/animals/2.jpg')
        case "animals/3.png": return require('./images/animals/3.jpg')
        case "animals/4.png": return require('./images/animals/4.jpg')
        case "animals/5.png": return require('./images/animals/5.jpg')
        case "animals/6.png": return require('./images/animals/6.jpg')
        case "animals/7.png": return require('./images/animals/7.jpg')
        case "animals/8.png": return require('./images/animals/8.jpg')

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
        default:
            return require('./images/simbols/19.png')
    }

};

export { createCardBoard, getImage, closeAllCards, cloneBoard, checkCardsEquals, closeCards, wonGame }