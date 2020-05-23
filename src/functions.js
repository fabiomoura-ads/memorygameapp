const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                pathImage: null
      
            }
        })
    })
}

const spreadCards = (board, pathImages) => {
    const rows = board.length;
    const columns = board[0].length;
    const totalCards = rows * columns;
    let cardsIncludes = 0;

    let indexInclude = 1;
    let count = 0;
    while (cardsIncludes < totalCards) {
        const rowSel = parseInt(Math.random() * rows, 10);
        const columnSel = parseInt(Math.random() * columns, 10);
        
        if ( count > 1) {
            indexInclude++;            
            count = 0;
        }

        if (!board[rowSel][columnSel].pathImage) {            
            board[rowSel][columnSel].pathImage = `simbols/${indexInclude}.png`
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

const closeCards = ( board, arPathImage ) => {
    return board.map(rows => {
        return rows.map(field => {
            if ( arPathImage.includes(field.pathImage) ) {
                return { ...field, opened: false }
            } else {
                return { ...field }
            }            
        })
    })    
}

const createCardBoard = (rows, column, pathImages) => {
    const board = createBoard(rows, column);
    spreadCards(board, pathImages)
    return board;
}

const fields = board => [].concat(...board);

const checkCardsEquals = (board, select) => fields(board).filter(field => ( field.opened && field.pathImage == select) ).length == 2;

const getPathImage = (pathImage) =>{
    switch (pathImage) {
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

export { createCardBoard, getPathImage, closeAllCards, cloneBoard, checkCardsEquals , closeCards}