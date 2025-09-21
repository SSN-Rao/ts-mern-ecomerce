import { CartItem, ShippingAddress} from "./Cart"
import { User } from "./User"

export type Order = {
    _id: string
    orderItems: CartItem[]
    shippingAddress: ShippingAddress
    paymentMethod: string
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number
    user: User
    isPaid: boolean
    paidAt?: string
    isDelivered: boolean
    deliveredAt?: string
    createdAt: string
    updatedAt: string
}