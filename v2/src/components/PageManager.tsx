import React, { useState } from "react";
import { atom, useAtom } from "jotai";
import CharacterSelect from "./CharacterSelect";
import Maze from "./Maze";
import Button from "./Button";

interface PageManagerProps {
  characters: Array<{
    id: string;
    imgSrc: string;
    name: string;
    description: string;
  }>;
}

export type PageType = "home" | "game";
export const currentPageAtom = atom<PageType>("home");

const PageManager: React.FC<PageManagerProps> = ({ characters }) => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [characterSelected, setCharacterSelected] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const changePage = (newPage: PageType) => {
    if (currentPage !== newPage && !isAnimating) {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentPage(newPage);
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleCharacterSelect = () => {
    console.log("character is selected!");
    setCharacterSelected(true);
  };

  const renderPageContent = (page: PageType) => {
    switch (page) {
      case "home":
        return (
          <div>
            <div className="flex">
              <div className="w-full text-center p-10">
                <div className="text-4xl mt-40">
                  a<span className="text-red-600">MAZE</span>ing
                </div>
                <p className="mt-2">The Maze Game</p>
                <div className="max-w-2xl mx-auto">
                  <p className="text-lg text-gray-500 mt-20 mb-6">
                    Amazeing is a maze game built with Astro, React, and
                    Tailwind CSS. Navigate through the maze using arrow keys and
                    reach the target to win!
                  </p>
                  <p className="text-lg text-gray-500 mb-6">
                    This game was originally built with vanilla JavaScript and
                    has been upgraded to use modern web technologies.
                  </p>
                </div>
                <Button className="mt-20" onClick={() => changePage("game")}>
                  Play
                </Button>
              </div>
              <div className="w-full h-screen bg-[url('/assets/background.png')]"></div>
            </div>
          </div>
        );

      case "game":
        return characterSelected ? (
          <div className="py-8 px-4">
            <Maze />
          </div>
        ) : (
          <div className="py-8 px-4 text-center">
            <p className="text-lg mb-6">
              Please select a character to play the game.
            </p>
            <Button onClick={() => changePage("home")}>Home</Button>
            <CharacterSelect
              characters={characters}
              onComplete={handleCharacterSelect}
            />
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div
        className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
          isAnimating
            ? "transform -translate-x-full"
            : "transform translate-x-0"
        }`}
      >
        {renderPageContent(currentPage)}
      </div>
    </div>
  );
};

export default PageManager;
