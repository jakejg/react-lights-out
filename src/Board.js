import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let row =[];
      for (let j = 0; j < ncols; j++) {
        let num = Math.random();
        if (num < chanceLightStartsOn) row.push(true);
        else row.push(false);
      }
      initialBoard.push(row);
    }
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    return board.every(row=> row.every(cell => cell === false))
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
        return boardCopy
      };

      let newBoard = [...oldBoard];
      flipCell(y, x, newBoard);
      flipCell(y-1, x, newBoard);
      flipCell(y+1, x, newBoard);
      flipCell(y, x-1, newBoard);
      flipCell(y, x+1, newBoard);
      
      // TODO: Make a (deep) copy of the oldBoard
      return newBoard
      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }
  
  console.log(board);

  if (hasWon()) return <h1>You won!</h1>;
  console.log(hasWon())

  return (
    <table>
      <tbody>
        {board.map((row, x) => (
            <tr>{row.map((boolean, y) => (
              <Cell flipCellsAroundMe={() => flipCellsAround(`${x}-${y}`)} isLit={boolean} />
              )
            )}</tr>
          )
        )
      }       
        </tbody>
    </table>
  )

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;
