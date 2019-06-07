export const fileGalleryState = {
  images: [],   // 0
  uploadedImage: null,    // 1
  uploadedDocument: null,   // 2
  document: [],   // 3
  openImageUploader: false,   // 4
  openDocumentUploader: false,    // 5
  openImageEditor: false,   // 6
  openDocumentGallery: false,   // 7
  openImageGallery: false,    // 8
}

export function reducer(state, action) {
  console.log('galleryState', state)

  switch (action.type) {
    case 0:
      return
    case 1:
      
    case 2:

  }
}