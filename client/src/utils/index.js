export const info2file = (list) => {
  const files = []
  list.forEach((item) => {
    files.push({
      uid: item.id,
      name: item.content,
      status: 'done',
      url: item.content,
    });
  });
  return files;
}