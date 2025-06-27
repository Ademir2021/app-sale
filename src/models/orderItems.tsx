// import type { Item } from "./items"
/**{
  "person":{"id":2},
	"branch":{"id":1},
	"user":{"id":1},
	"discount":3.50,
  "itemsSale": [
    {
      "item":{"id":1d},
      "amount": 2,
      "price": 250.80
    },
		 {
       "item":{"id":2},
      "amount": 3,
      "price": 250.90
    },
		{
       "item":{"id":3},
      "amount": 4,
      "price": 250.90
    }
  ]
} */


type Person ={
  id:number
}
type Branch ={
  id:number
}
type User ={
  id:number
}
type Item = {
  id:number
  name:string
}
export type ItemsSale = {
  item:Item;
  amount:number;
  price:number;
  tItem:number;
}
export type Order ={
  person:Person;
  branch:Branch;
  user:User;
  discount:number;
  tSale:number;
  tNote:number;
  itemSale:ItemsSale[];
}