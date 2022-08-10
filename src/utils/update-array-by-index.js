export default (arrToUpdate, index, field, value) => {
  const newArray = arrToUpdate;
  newArray[index][field] = value;
  console.log(newArray)
  return newArray;
};
