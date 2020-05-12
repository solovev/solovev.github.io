export const toMap = (array, keyProperty, transform) => {
  const result = {}
  array.forEach(element => {
    element = transform ? transform(element) : element
    const key = element[keyProperty]
    if (!key) return
    result[key] = element
  })
  return result
}

export const toOrder = (array, keyProperty, transform) => {
  const data = {}
  const ids = array.map(element => {
    element = transform ? transform(element) : element
    const key = element[keyProperty]
    data[key] = element
    return key
  })
  return { data, ids }
}
