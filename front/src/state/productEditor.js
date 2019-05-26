export const editorState = {
  title: '',// 1; action: {id, value, type}
  titleValidation: null, // 2
  description: '', // 3; action: {id, value, type}
  descriptionValidation: null, // 4
  images: [], // 5; action format: { id: Int, image: {name, content, size}, type: String['add' or 'remove'] }
  imagesValidation: null, // 6
  filesCheck: null, // 7; action: {id, value, type}
  files: [], // 8; action format: { id: Int, file: {name, content, size}, type: String['add' or 'remove'] }
  filesValidation: null, // 9
  price: 0, // 10; action: {id, value, type}
  priceValidation: null, // 11
  sale: 0, // 12; action: {id, value, type}
  saleValidation: null, // 13
  categories: [], // 14; action: {id: Int, type: ['add' || 'remove'], value: String}
  categoryValidation: null, // 15
  numberOfProducts: 0, // 16; action: {id, value, type}
  numberOfProductsValidation: null, // 17
}

export function reducer(state, action) {
  
  console.log('editorState: ', state)

  switch (action.type) {
    case 1:
      return Object.assign({}, state, { title: action.value })
    case 3:
      return Object.assign({}, state, { description: action.value })
    case 5:
      let { image } = action.image
      if (action.type === 'add') {
        return Object.assign({}, state, {
          images: state.images.concat(image)
        })
      } else {
        // case you remove an image from state
        return Object.assign({}, state, {
          images: state.images.filter(img => (img.name !== image.name && img.size !== image.size))
        })
      }
    case 7:
      return Object.assign({}, state, { filesCheck: !state.filesCheck })
    case 8:
      let { file } = action.file
      if (action.type === 'add') {
        return Object.assign({}, state, {
          files: state.files.concat(file)
        })
      } else {
        return Object.assign({}, state, {
          files: state.files.filter(fi => (fi.name !== file.name && fi.size !== file.size))
        })
      }
    case 10:
      return Object.assign({}, state, { price: action.value })
    case 12:
      return Object.assign({}, state, { sale: action.value })
    case 14:
      if (action.type === 'add') {
        return Object.assign({}, state, { categories: state.categories.concat(action.value) })
      } else {
        return Object.assign({}, state, { categories: state.categories.filter(c => c.value !== action.value) })
      }
    case 16:
      return Object.assign({}, state, { numberOfProducts: action.value })

    default:
      return state
  }
}
