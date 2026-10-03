export const formatGroupDate = (str: string | number) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const yesterday = today - 24 * 60 * 60 * 1000;

  if (Number(str) === today) {
    return 'Сегодня';
  } else if (Number(str) === yesterday) {
    return 'Вчера';
  } else {
    return new Date(Number(str)).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });
  }
};
