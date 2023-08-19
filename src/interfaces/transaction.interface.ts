
export type TransactionDetails = {
    title:string;
    price:number;
    category:string;
    thumbnail:string;
    qty:number;
    total:number;
}

export interface ITransactionResponse {
    id:string;
    grandTotal:string;
    delivery:string;
    paymentMethod:string;
    cardNumber:string;
    address:string;
    name:string;
    email:string;
    country:string;
    city:string;
    phone:string;
    detail:TransactionDetails[]
    createdAt:string;
}
