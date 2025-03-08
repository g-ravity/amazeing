import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { mazeStateAtom } from '../store/mazeStore';
import type { CharacterPacks } from './PageManager';

interface CharacterCardProps {
  imgSrc: string;
  name: string;
  locked: boolean;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

interface CharacterPackProps {
  packName: CharacterPacks;
  minXP: number;
  characters: Array<{
    id: string;
    imgSrc: string;
    name: string;
    description: string;
  }>;
  locked: boolean
  selectedCharacter: string | null;
  handleCharacterSelect: (character: { id: string, imgSrc: string }) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ 
  imgSrc, 
  name, 
  locked,
  description, 
  isSelected, 
  onClick 
}) => {
  const [showDescription, setShowDescription] = useState(false);
  
  return (
    <div 
      className={`relative ${locked ? 'cursor-not-allowed' :  'cursor-pointer'} transition-all duration-200 p-4 rounded-lg ${
        isSelected ? 'bg-blue-100 border-2 border-blue-500' : !locked ? 'hover:bg-gray-100' : ''
      }`}
      onMouseEnter={() => { if(!locked) setShowDescription(true) }}
      onMouseLeave={() => { if(!locked) setShowDescription(false) }}
      onClick={onClick}
    >
      <img 
        src={imgSrc} 
        alt={name} 
        className={`w-36 h-36 object-contain mx-auto ${locked ? 'grayscale' : ''}`}
      />
      <h3 className={`text-center mt-2 font-medium ${locked ? 'grayscale' : ''}`}>{name}</h3>
      
      {showDescription && !isSelected && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center p-4 rounded-lg">
          <p className="text-sm text-center">{description}</p>
        </div>
      )}
    </div>
  );
};

const CharacterPack: React.FC<CharacterPackProps> = ({
  packName,
  minXP,
  characters,
  locked,
  selectedCharacter,
  handleCharacterSelect
}) => {
   
  return (<div className='mb-12'>
    <p className={`text-2xl mb-6 ${locked ? 'grayscale' : ''}`}>
      <span>{packName}</span>
    {
    locked ? 
      <span className="relative group">
        <svg className='w-[1.3rem] h-[1.3rem] mt-[-10px] grayscale ml-2 inline-block' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
          <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z"></path>
        </svg>
        <div className="absolute font-mono left-0 top-full mt-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
          Reach {minXP} XP to unlock
        </div>
      </span>
      : null
    }
    </p>
    <div className='flex'>
    {
      characters.map(character => (
        <CharacterCard
          key={character.id}
          imgSrc={character.imgSrc}
          locked={locked}
          name={character.name}
          description={character.description}
          isSelected={selectedCharacter === character.id}
          onClick={() => handleCharacterSelect(character)}
        />
      ))
    }
    </div>
  </div>)
}

interface CharacterSelectProps {
  characterMap: {[key in CharacterPacks]: {
    isLocked: boolean;
    minXP: number;
    characters: Array<{
      id: string;
      imgSrc: string;
      name: string;
      description: string;
    }>}
  };
  onComplete: () => void;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ characterMap, onComplete }) => {
  const [mazeState, setMazeState] = useAtom(mazeStateAtom);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  
  const handleCharacterSelect = (character: { id: string, imgSrc: string }) => {
    if (selectedCharacter === character.id) {
      setSelectedCharacter(null);
      mazeState.playerImg = null;
    } else {
      setSelectedCharacter(character.id);
      mazeState.playerImg = character.imgSrc;
    }
    
    setMazeState({ ...mazeState });
  };
  
  const handleContinue = () => {
    if (selectedCharacter) {
      onComplete();
    } else {
      alert('Please select a character to continue');
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center">Select Your Character</h2>

      <div>
        {
          Object.keys(characterMap).map(pack=> <CharacterPack packName={pack as CharacterPacks} minXP={characterMap[pack as CharacterPacks].minXP} characters={characterMap[pack as CharacterPacks].characters} locked={characterMap[pack as CharacterPacks].isLocked} handleCharacterSelect={handleCharacterSelect} selectedCharacter={selectedCharacter} />)
        }
      </div>
      
      <div className="flex justify-center">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CharacterSelect;