const config = {
    gameMatrix: [],
    matrixSize: 4,
    map: document.querySelector(`#game`),
    rallyPoint: [1, 1],
    styleMap() {
        let css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = `.cell {width: calc(100% * (1/${this.matrixSize}) - 10px - 1px) }`;
        document.head.appendChild(css);
    },
};