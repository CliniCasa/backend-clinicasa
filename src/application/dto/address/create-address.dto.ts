export class CreateAddressDto{
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    complement?: string;
}