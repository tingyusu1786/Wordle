import React from 'react';

interface RowProps {
  letter: string;
  correctLetter: string;
  answer: string;
  isCurrentRow: boolean;
}

const Tile: React.FC<RowProps> = ({ letter, correctLetter, answer, isCurrentRow }) => {
  function evaluateLetter(letter: string) {
    if (isCurrentRow && letter !== '') {
      return 'typing';
    } else {
      if (letter === '') {
        return 'unknown';
      } else if (letter === correctLetter) {
        return 'correct';
      } else if (answer.includes(letter)) {
        return 'present';
      } else {
        return 'absent';
      }
    }
  }

  const status = evaluateLetter(letter);

  let style = 'box-border w-14 h-14 flex text-base items-center justify-center font-bold ';

  switch (status) {
    case 'typing':
      style += `border-2 border-solid dark:text-white dark:border-[#d3d6da] text-black border-[#878a8c]`;
      break;
    case 'unknown':
      style += `border-2 border-solid dark:border-[#878a8c] dark:border-[#d3d6da]`;
      break;
    case 'correct':
      style += `text-white dark:bg-green-500 bg-[#6aaa64]`;
      break;
    case 'present':
      style += `text-white dark:bg-yellow-500 bg-[#c9b458]`;
      break;
    case 'absent':
      style += 'text-white bg-[#787c7e]';
      break;
  }

  return <div className={style}>{letter}</div>;
};

export default Tile;
