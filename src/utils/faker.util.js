
import faker from 'faker';

faker.locale = 'es';

export const fakerData = ( i, max, array=[] ) => {
  
  const product = { 
    id: i, 
    title: faker.commerce.productName(),
    price: faker.commerce.price(100, 5000, 0, '$'),
    thumbnail: faker.image.avatar()
  }

  array.push(product)

  const data = (i == max) ? array : fakerData( i+1, max, array);

  return data
}



