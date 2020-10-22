export const validPassword = (password: string): boolean => {
  const whiteSpace = /\s/;
  if (whiteSpace.test(password)) return false;

  return password.length >= 3 && password.length <= 20;
};
