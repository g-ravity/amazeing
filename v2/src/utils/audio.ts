export const playSound = (soundPath: string) => {
  if (typeof window !== "undefined") {
    const audio = new Audio(soundPath);
    audio.volume = 0.5;
    audio.play().catch((error) => {
      console.error("Error playing sound:", error);
    });
  }
};
