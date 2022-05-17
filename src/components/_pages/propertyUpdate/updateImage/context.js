import { useState, createContext } from 'react';

export const UploadImageContext = createContext({
  propertyId: '',
  images: [],
  setImages: () => {},
});

export default function UploadImageProvider({
  children,
  propertyId = '',
  images = [],
}) {
  const [_images, _setImages] = useState(images);
  const contextValue = {
    propertyId: propertyId,
    images: _images,
    setImages: _setImages,
  };

  return (
    <UploadImageContext.Provider value={contextValue}>
      {children}
    </UploadImageContext.Provider>
  );
}
