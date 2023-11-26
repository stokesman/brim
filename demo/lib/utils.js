export const makeCyclist = (valueList, onNext) => {
  let index = 0
  return [
    valueList[index],
    () => {
      index = (index + 1) % valueList.length
      onNext(valueList[index])
    }
  ]
}

// const encodeHTML = aString => {
//   return aString.replace(/[\u00A0-\u9999<>\&]/g, i => `&#${i.charCodeAt(0)};`);
// }
