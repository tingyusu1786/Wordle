import React, { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import Header from './components/Header';
import Board from './components/Board';

type gameState = {
  currentRow: number;
  guesses: string[][];
};

function reducer(
  state: gameState,
  action: { type: 'press_enter' | 'press_backspace' } | { type: 'press_letter'; payload: string }
) {
  const row = state.guesses[state.currentRow];
  switch (action.type) {
    case 'press_enter':
      if (row.indexOf('') === -1) {
        state.currentRow = state.currentRow <= 6 ? state.currentRow + 1 : 6;
      }
      break;
    case 'press_backspace': {
      const index = row.indexOf('') === -1 ? 4 : row.indexOf('') - 1;
      row[index] = '';
      break;
    }
    case 'press_letter': {
      const index = row.indexOf('');
      if (index !== -1) {
        row[index] = action.payload.toUpperCase();
      }
      break;
    }
    default:
      break;
  }
}

const App: React.FC = () => {
  const [gameState, dispatch] = useImmerReducer(reducer, { currentRow: 0, guesses: Array(6).fill(Array(5).fill('')) });
  const answer = 'front'.toUpperCase();

  const handleKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        dispatch({ type: 'press_enter' });
        break;
      case 'Backspace':
        dispatch({ type: 'press_backspace' });
        break;
      default:
        if (/^[A-Za-z]{1}$/.test(event.key)) {
          dispatch({ type: 'press_letter', payload: event.key });
        }
        break;
    }
  };

  const isSolved = (): boolean | undefined => {
    return gameState.currentRow >= 1 && gameState.guesses[gameState.currentRow - 1].join('') === answer
      ? true
      : gameState.currentRow === 6 && gameState.guesses[gameState.currentRow - 1].join('') !== answer
      ? false
      : undefined;
  };

  useEffect(() => {
    const handleKeyDownWrapper = (event: KeyboardEvent) => {
      handleKeydown(event);
    };
    isSolved() === undefined && window.addEventListener('keydown', handleKeyDownWrapper);
    return () => {
      window.removeEventListener('keydown', handleKeyDownWrapper);
    };
  }, [gameState.currentRow, handleKeydown]);

  return (
    <div className={`flex flex-col items-center h-screen bg-white dark:bg-gray-800`}>
      <Header />
      <Board guesses={gameState.guesses} answer={answer} currentRow={gameState.currentRow} />
      {isSolved() !== undefined && (
        <div className={`my-3 dark:text-white text-black`}>{isSolved() ? '🎉 You win!' : 'You loose! 💦'}</div>
      )}
    </div>
  );
};

export default App;
