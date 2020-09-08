export const hoursFromNow = (time: number) => {
  const diffInMillis = time - Date.now();
  const seconds = diffInMillis / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;

  return Math.ceil(hours);
};

export const formatedAuthor = (author: string) => {
  return `${author.substring(0, 5)}...${author.substring(27, 32)}`;
};
