const products = [
  {
    _id: '1',
    name: 'Retro Jersey 1',
    image: '/images/jersey1.png',
    description: 'High quality retro football jersey.',
    brand: 'Retro Brand',
    category: 'Jerseys',
    price: 89.99,
    rating: 4.5,
    numReviews: 12,
    sizes: [
      { size: 'S', countInStock: 0 },
      { size: 'M', countInStock: 0 },
      { size: 'L', countInStock: 0 },
      { size: 'XL', countInStock: 0 },
    ], // Add sizes with stock information
  },
  
]


export default products
