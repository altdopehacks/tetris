import React from 'react';
import { CELL_SIZE } from '../constants';
import type { Tetromino } from '../types';

type NextPieceProps = {
  piece: Tetromino;
};

export const NextPiece: React.FC<NextPieceProps> = ({ piece }) => {
  // 4x4のグリッドを作成
  const grid = Array(4).fill(null).map(() => Array(4).fill(false));
  
  // ピースを中央に配置
  const offsetX = Math.floor((4 - piece.shape[0].length) / 2);
  const offsetY = Math.floor((4 - piece.shape.length) / 2);
  
  // グリッドにピースを配置
  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        grid[y + offsetY][x + offsetX] = true;
      }
    });
  });

  return (
    <div className="border-2 border-gray-700 bg-gray-900 p-2">
      {grid.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: cell ? piece.color : 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};