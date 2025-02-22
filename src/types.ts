export type Position = {
  x: number;
  y: number;
};

export type Tetromino = {
  shape: number[][];
  color: string;
};

export type GameState = {
  grid: string[][];
  currentPiece: Tetromino;
  nextPiece: Tetromino;
  currentPosition: Position;
  score: number;
  gameOver: boolean;
};