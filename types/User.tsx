export type User = {
    _id?: any
    firstName: string;
    lastName: string;
    password: number;
    phone?: string;
    email:string;
    token: string;
    image?: string;
    score: number;
    ratesNumber: number;
    rates: {
      user: string,
      rate: number
    }[],
    car: {
      model: string,
      registration: string,
      color: string
    }
}