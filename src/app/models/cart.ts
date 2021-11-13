export class Cart {

    id?: number;
    idProduct: string;
    idPrice: string;
    quantity: number;

    constructor(idProduct: string, idPrice: string, quantity: number) {

        this.idProduct = idProduct;
        this.idPrice = idPrice;
        this.quantity = quantity;

    }
}
