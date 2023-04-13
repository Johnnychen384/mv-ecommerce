export interface productObject {
    category: String,
    id: number,
    name: String,
    price: number,
    rating: number,
    url: String
}

export interface userObject {
    email: String,
    username: String,
    password: String,
    address: String,
    creditcard: String
}

export interface tempObject {
    username: String | null,
    name: String | null,
    quantity: number | null
}

export interface cartObject {
    id: number,
    user: null,
    userModel: {},
    product: productObject,
    quantity: number,
    total: number
}