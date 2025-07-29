import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import type { Product } from '../types/product'

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['product'],
    queryFn: async () => (await apiClient.get<Product[]>('/api/product')).data,
  })

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ['product', slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`/api/product/slug/${slug}`)).data,
  })
