import React from 'react';
import Tile from './Tile';

interface BoardProps {
  word: string[];
  answer: string;
  isCurrentRow: boolean;
}

const Row: React.FC<BoardProps> = ({ word, answer, isCurrentRow }) => {
  return (
    <div className='flex flex-row gap-x-1.5'>
      {word.map((tile, index) => (
        <Tile
          letter={word[index]}
          correctLetter={answer[index]}
          answer={answer}
          isCurrentRow={isCurrentRow}
          key={index}
        />
      ))}
    </div>
  );
};

export default Row;
