/**
 * Generates a random string of the specified length consisting of letters.
 *
 * @param {number} length - The length of the string to generate.
 * @returns {string} The generated random string.
 */
export const randomSchemaName = (length: number = 5): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let index = 0; index < length; index++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `${result}_test`;
};
