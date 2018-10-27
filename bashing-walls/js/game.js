class Game {
    constructor() {
        this.buildMap();
        this.highlightCell(config.rallyPoint)
        this.handleKeypress();
        config.styleMap();
    }

    _isCoordCorrect(coord) {
        return parseInt(coord) >= 0 && parseInt(coord) < config.matrixSize;
    }

    _deselectAll() {
        let elems = Array.from(document.querySelectorAll `#game .cell`);

        elems.map(el => {
            el.classList.remove `cell-selected`;
        })
    }

    buildMap() {
        let row = 0;

        for (let ii = 0; ii < config.matrixSize; ii++) {
            config.gameMatrix[ii] = [];
            for (let jj = 0; jj < config.matrixSize; jj++) {
                config.gameMatrix[ii][jj] = jj;
            }
        }

        config.gameMatrix.map(ii => {
            ii.map(jj => {
                let cell = document.createElement `div`,
                    text = document.createTextNode(parseInt(jj) + 1);

                cell.classList.add `cell`
                cell.appendChild(text);
                cell.setAttribute(`data`, `${row}-${jj}`);
                config.map.appendChild(cell);
            });

            row++;
        })
    }

    highlightCell(coords) {
        const areCoordsCorrect = this._isCoordCorrect(coords[0]) && this._isCoordCorrect(coords[1]);

        if (!areCoordsCorrect) return;

        this._deselectAll();

        const current = document.querySelector('[data="' + coords[0] + '-' + coords[1] + '"]');
        current.classList.add `cell-selected`;
    }

    move(direction) {
        // get active cell coords

        const coordsActiveCell = document
            .querySelector `.cell-selected`
            .getAttribute `data`
            .split `-`;

        let next = {
            row: 0,
            cell: 0
        };


        switch (direction) {
            case `up`:
                next.row = -1;
                next.cell = 0;
                break;
            case `down`:
                next.row = 1;
                next.cell = 0;
                break;
            case `left`:
                next.row = 0;
                next.cell = -1;
                break;
            case `right`:
                next.row = 0;
                next.cell = 1;
                break;
            default:
                return;
        }

        // set next cell coords

        let row = parseInt(coordsActiveCell[0]) + next.row,
            cell = parseInt(coordsActiveCell[1]) + next.cell;

        // input boundaries

        if (row >= config.matrixSize) row = 0;
        if (cell >= config.matrixSize) cell = 0;
        if (row < 0) row = config.matrixSize - 1;
        if (cell < 0) cell = config.matrixSize - 1;

        this.highlightCell([row, cell]);
    }

    handleKeypress() {
        document.body.addEventListener(`keydown`, event => {
            switch (event.key) {
                case `ArrowUp`:
                    event.preventDefault();
                    this.move('up');
                    break;
                case `ArrowDown`:
                    event.preventDefault();
                    this.move('down');
                    break;
                case `ArrowLeft`:
                    event.preventDefault();
                    this.move('left');
                    break;
                case `ArrowRight`:
                    event.preventDefault();
                    this.move('right');
                    break;
                default:
                    return;
            }
        });
    }
}

let game = new Game();