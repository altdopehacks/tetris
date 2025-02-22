import React from 'react';
import { GameBoard } from './components/GameBoard';
import { NextPiece } from './components/NextPiece';
import { useTetris } from './hooks/useTetris';
import { Square } from 'lucide-react';

function App() {
  const { grid, score, gameOver, nextPiece } = useTetris();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Square className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl font-bold">テトリス</h1>
        </div>
        
        <div className="flex gap-4 items-start">
          <GameBoard grid={grid} />
          
          <div className="text-left">
            <div className="mb-4">
              <p className="text-xl mb-2">スコア: {score}</p>
            </div>

            <div>
              <p className="text-lg mb-2">次のピース:</p>
              <NextPiece piece={nextPiece} />
            </div>
          </div>
        </div>

        {gameOver && (
          <div className="mt-4">
            <p className="text-2xl text-red-500 font-bold">ゲームオーバー!</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              もう一度プレイ
            </button>
          </div>
        )}

        <div className="mt-4 text-gray-400">
          <p>操作方法:</p>
          <p>← → : 移動</p>
          <p>↑ : 回転</p>
          <p>↓ : 落下</p>
        </div>
      </div>
    </div>
  );
}

export default App;