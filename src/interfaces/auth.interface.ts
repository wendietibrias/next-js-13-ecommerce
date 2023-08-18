
export interface IAuthProviderInput {
    email:string;
    password:string;
}

export interface IAuthProviderOutput {
    name:string;
    email:string | null;
    id:string;
}