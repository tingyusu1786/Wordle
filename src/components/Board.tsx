import React from 'react';
import Row from './Row';

interface AppProps {
  guesses: string[][];
  answer: string;
  currentRow: number;
}

const Board: React.FC<AppProps> = ({ guesses, answer, currentRow }) => {
  return (
    <div className='flex flex-col gap-y-1.5'>
      {guesses.map((row, index) => (
        <Row word={row} answer={answer} isCurrentRow={currentRow === index} key={`r-${index}`} />
      ))}
    </div>
  );
};

export default Board;
