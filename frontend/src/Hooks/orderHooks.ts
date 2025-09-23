import { useMutation, useQuery } from "@tanstack/react-query"
import apiClient from "../apiClient"
import type { CartItem, ShippingAddress } from "../types/Cart"
import type { Order } from "../types/Order"

export const useGetOrderDetailsQuery = (id: string) =>
    useQuery({
        queryKey: ['order', id],
        queryFn: async () =>
        (await apiClient.get<Order>(`api/orders/${id}`)).data,
    })

export const useGetSadapayClientIdQuery = () =>
    useQuery({
        queryKey: ['sadapay-ClientId'],
        queryFn: async () =>
        (await apiClient.get<{ClientId: string }>(`api/keys/sadapay`)).data,
    })

export const usePayOrderMutation = () => useMutation ({
    mutationFn: async (details: {orderId: string}) => 
    (
        await apiClient.put<{ message: string; order: Order} > (
            `api/orders/${details.orderId}/pay`,
            details
        )
    ).data,
})

export const useCreateOrderMutation = () => useMutation ({
    mutationFn: async (order: {
        orderItems: CartItem[]
        shippingAddress: ShippingAddress
        paymentMethod: string
        itemsPrice: number
        shippingPrice: number
        taxPrice: number
        totalPrice: number
    }) => 
    (
        await apiClient.post<{ message: string; order: Order} > (
            `api/orders`,
            order
        )
    ).data,
})

export const useGetOrderHistoryQuery = () =>
    useQuery({
        queryKey: ['order-history'],
        queryFn: async () =>
        (await apiClient.get<Order[]>(`api/orders/mine`)).data,
    })
