export type CartItem = {
    image : string | undefined
    slug: string
    quantity: number   
    countInStock: number
    price: number
    _id: string
    name: string
}


export type ShippingAddress = {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
}


export type Cart = {
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number
    shippingAddress: ShippingAddress
    paymentMethod: string
    cartItems: CartItem[]
    isPaid: boolean
}