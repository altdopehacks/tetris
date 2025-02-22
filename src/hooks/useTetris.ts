import { useState, useEffect, useCallback } from 'react';
import { GRID_WIDTH, GRID_HEIGHT, TETROMINOES, SPACE_BACKGROUNDS } from '../constants';
import type { GameState, Position, Tetromino } from '../types';

const createEmptyGrid = () =>
  Array(GRID_HEIGHT).fill(null).map(() =>
    Array(GRID_WIDTH).fill('')
  );

const getRandomTetromino = () =>
  TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];

export const useTetris = () => {
  const [gameState, setGameState] = useState<GameState>({
    grid: createEmptyGrid(),
    currentPiece: getRandomTetromino(),
    nextPiece: getRandomTetromino(),
    currentPosition: { x: Math.floor(GRID_WIDTH / 2) - 1, y: 0 },
    score: 0,
    gameOver: false,
    landedPieces: 0,
    backgroundIndex: 0
  });

  const checkCollision = useCallback((position: Position, piece: Tetromino) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = position.x + x;
          const newY = position.y + y;
          
          if (
            newX < 0 ||
            newX >= GRID_WIDTH ||
            newY >= GRID_HEIGHT ||
            (newY >= 0 && gameState.grid[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, [gameState.grid]);

  const checkTopLineExceeded = useCallback((grid: string[][]) => {
    return grid[0].some(cell => cell !== '');
  }, []);

  const mergePieceToGrid = useCallback(() => {
    const newGrid = gameState.grid.map(row => [...row]);
    const { currentPiece, currentPosition, landedPieces, backgroundIndex } = gameState;

    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const newY = currentPosition.y + y;
          if (newY < 0) {
            setGameState(prev => ({ ...prev, gameOver: true }));
            return;
          }
          newGrid[newY][currentPosition.x + x] = currentPiece.color;
        }
      }
    }

    // Check for completed lines
    let completedLines = 0;
    for (let y = GRID_HEIGHT - 1; y >= 0; y--) {
      if (newGrid[y].every(cell => cell !== '')) {
        newGrid.splice(y, 1);
        newGrid.unshift(Array(GRID_WIDTH).fill(''));
        completedLines++;
      }
    }

    // Check if blocks exceed top line
    if (checkTopLineExceeded(newGrid)) {
      setGameState(prev => ({
        ...prev,
        grid: newGrid,
        gameOver: true
      }));
      return;
    }

    // Update background every 5 landed pieces
    const newLandedPieces = landedPieces + 1;
    const newBackgroundIndex = newLandedPieces % 5 === 0 
      ? (backgroundIndex + 1) % SPACE_BACKGROUNDS.length 
      : backgroundIndex;

    setGameState(prev => ({
      ...prev,
      grid: newGrid,
      currentPiece: prev.nextPiece,
      nextPiece: getRandomTetromino(),
      currentPosition: { x: Math.floor(GRID_WIDTH / 2) - 1, y: 0 },
      score: prev.score + (completedLines * 100),
      landedPieces: newLandedPieces,
      backgroundIndex: newBackgroundIndex
    }));
  }, [gameState, checkTopLineExceeded]);

  const moveDown = useCallback(() => {
    const newPosition = {
      ...gameState.currentPosition,
      y: gameState.currentPosition.y + 1
    };

    if (checkCollision(newPosition, gameState.currentPiece)) {
      mergePieceToGrid();
    } else {
      setGameState(prev => ({
        ...prev,
        currentPosition: newPosition
      }));
    }
  }, [gameState, checkCollision, mergePieceToGrid]);

  const moveHorizontally = useCallback((direction: number) => {
    const newPosition = {
      ...gameState.currentPosition,
      x: gameState.currentPosition.x + direction
    };

    if (!checkCollision(newPosition, gameState.currentPiece)) {
      setGameState(prev => ({
        ...prev,
        currentPosition: newPosition
      }));
    }
  }, [gameState, checkCollision]);

  const rotate = useCallback(() => {
    const rotatedShape = gameState.currentPiece.shape[0]
      .map((_, i) => gameState.currentPiece.shape.map(row => row[i]).reverse());
    
    const rotatedPiece = {
      ...gameState.currentPiece,
      shape: rotatedShape
    };

    if (!checkCollision(gameState.currentPosition, rotatedPiece)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: rotatedPiece
      }));
    }
  }, [gameState, checkCollision]);

  useEffect(() => {
    if (gameState.gameOver) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') moveHorizontally(-1);
      if (event.key === 'ArrowRight') moveHorizontally(1);
      if (event.key === 'ArrowDown') moveDown();
      if (event.key === 'ArrowUp') rotate();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameOver, moveHorizontally, moveDown, rotate]);

  useEffect(() => {
    if (gameState.gameOver) return;

    const gameLoop = setInterval(moveDown, 1000);
    return () => clearInterval(gameLoop);
  }, [gameState.gameOver, moveDown]);

  const displayGrid = gameState.grid.map(row => [...row]);
  const { currentPiece, currentPosition } = gameState;

  for (let y = 0; y < currentPiece.shape.length; y++) {
    for (let x = 0; x < currentPiece.shape[y].length; x++) {
      if (currentPiece.shape[y][x]) {
        const newY = currentPosition.y + y;
        if (newY >= 0) {
          displayGrid[newY][currentPosition.x + x] = currentPiece.color;
        }
      }
    }
  }

  return {
    grid: displayGrid,
    score: gameState.score,
    gameOver: gameState.gameOver,
    nextPiece: gameState.nextPiece,
    backgroundIndex: gameState.backgroundIndex
  };
};