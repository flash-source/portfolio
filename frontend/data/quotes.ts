export type Quote = {
  line: string;
  character: string;
  movie: string;
};

export const marvelQuotes: Quote[] = [
  { line: "I am Iron Man.", character: "Tony Stark", movie: "Iron Man" },
  {
    line: "I can do this all day.",
    character: "Steve Rogers",
    movie: "Captain America: The Winter Soldier",
  },
  { line: "Whatever it takes.", character: "Tony Stark", movie: "Avengers: Endgame" },
  { line: "We are Groot.", character: "Groot", movie: "Guardians of the Galaxy" },
];