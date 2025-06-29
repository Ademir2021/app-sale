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
  itemsSale:ItemsSale[];
}