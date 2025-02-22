export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;
export const CELL_SIZE = 30;

export const TETROMINOES: Tetromino[] = [
  {
    // I piece
    shape: [[1, 1, 1, 1]],
    color: '#00f0f0'
  },
  {
    // O piece
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#f0f000'
  },
  {
    // T piece
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: '#a000f0'
  },
  {
    // L piece
    shape: [
      [1, 0],
      [1, 0],
      [1, 1]
    ],
    color: '#f0a000'
  },
  {
    // J piece
    shape: [
      [0, 1],
      [0, 1],
      [1, 1]
    ],
    color: '#0000f0'
  },
  {
    // S piece
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: '#00f000'
  },
  {
    // Z piece
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: '#f00000'
  }
];