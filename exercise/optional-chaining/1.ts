// Using optional chaining, print the price amount of each listed product. If
// there is no price amount, then print "not for sale".

import { strict as assert } from "assert";

interface Product {
  name: string;
  price?: {
    amount: number;
    currency: string;
  };
}

const phone: Product = {
  name: "Phone",
  price: {
    amount: 300,
    currency: "USD"
  }
};

const box: Product = {
  name: "Box"
};

const getPrice = (product: Product): string => {
  let result = 'not for sale';
  if( product.price?.amount  !== undefined ){
    result = `${ product.price.amount} ${product.price.currency}`
  }
  return result;
}

console.log('phone price', getPrice(phone) )
console.log('box price', getPrice(box) )

