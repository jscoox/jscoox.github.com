const matrix = [],
      rowsNcols = 4,
      events = ['click', 'mouseover'],
      style = '.cell {width: calc(100% * (1/'+rowsNcols+') - 10px - 1px) }',
      matrixDiv = document.createElement("div");
      matrixDiv.setAttribute('id', 'matrixDiv');
      document.body.appendChild(matrixDiv);

let clickedFlag = 0,
    row = 0,
    cellsArray= [];

function render(){
  setCSSWidthForCells();
  populateMatrix();
  cellAddAttributes();
  makeElementsArray();
  listenForClick();
}

//set width, based on how many cells there are / row
// see const rowsNcols
function setCSSWidthForCells(){
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = style;
  document.head.appendChild(css);
}

//populate matrix
function populateMatrix(){
  for(let ii = 0; ii < rowsNcols; ii ++){
    matrix[ii] = [];
    for(let jj = 0; jj < rowsNcols; jj++){
      matrix[ii][jj] = jj;
    }
  }
}

//add attributes to each cell, for later identification
function cellAddAttributes(){
  matrix
    .map( x => {
      x.map( y => {
        let cell = document.createElement("div");
        let text = document.createTextNode(y);
        cell.classList.add("cell");
        cell.classList.add("cell-"+y);
        cell.classList.add("cell-not-selected");
        cell.appendChild(text);
        cell.setAttribute('data-row', row);
        cell.setAttribute('data-col', y);
        matrixDiv.appendChild(cell);
      });
      row++;
    });
}

//make an array with all the dom elements
//this is a hack that turns the nodes object into an array, do we can map over it in the listenForClick function
function makeElementsArray(){
  const cells = document.querySelectorAll('.cell');

  cellsArray = Object
        .keys(cells)
        .map(key => { return {order: key, element: cells[key]}; })
        .sort( (x,y) => x.order-y.order );
}

//you can only start selecting if you click ;)
function listenForClick(){
  matrixDiv.addEventListener("mousedown", function(event){
    clickedFlag = 1;
  });
  matrixDiv.addEventListener("mouseup", function(event){
    clickedFlag = 0;
  });

  cellsArray
    .map( x => {
      x.element.setAttribute("id", "cell-"+x.order);
      x.element.setAttribute("data-cell-id", x.order);
      toggleSelectClass(x.element);
    });
}

//where the magic begins
function toggleSelectClass(cell){
  cell.addEventListener('mouseover', function(e){
    if(clickedFlag){
      const cellInfo = {
        id: cell.getAttribute("data-cell-id"),
        row: cell.getAttribute("data-row"),
        col: cell.getAttribute("data-col")
      };

      cellsArray.map( cell => {
        cell.element.classList.remove("cell-selected")
      });

      processCell(cellInfo, cellInfo.col);
    }
  });
}

//where the magic gets processed ;)
function processCell(cellInfo, maxCol){
  let ii = cellInfo.id;

  while(ii>=0){
    highlightCell(ii, maxCol);
    ii--;
  }
}

//where the magic happens
function highlightCell(ii, maxCol){
  const cell = document.getElementById("cell-"+ii);
  const cellInfo = {
    id: cell.getAttribute("data-cell-id"),
    row: cell.getAttribute("data-row"),
    col: cell.getAttribute("data-col")
  };

  if(cellInfo.col <= maxCol) cell.classList.add("cell-selected");
}
