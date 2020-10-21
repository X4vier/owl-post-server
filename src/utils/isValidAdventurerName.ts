export const isValidAdventurerName = (adventurerName: string): boolean => {
  const leadingWhitespaceRe = /^[ \t]+/;
  if (leadingWhitespaceRe.test(adventurerName)) return false;

  const trailingWhitespaceRe = /[ \t]+$/;
  if (trailingWhitespaceRe.test(adventurerName)) return false;

  return adventurerName.length >= 3 && adventurerName.length <= 20;
};
