export interface IProductPromise {
    title:string;
    price:number;
    stock:number;
    thumbnail:any;
    images:IProductImageObject[];
    excerpt:string;
    description:string;
    category:{
        title:string;
        slug:{
            current:string;
        };
    };
    slug:{
        current:string;
    };
}

export interface IProductImageObject {
    asset: {
        _ref:string;
    }
}