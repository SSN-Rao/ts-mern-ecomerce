import React from 'react'
import type { Cart, CartItem } from './types/Cart'

type AppState = {
  mode: string
  cart: Cart
}

const initialState: AppState = {
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
  cart: {
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : [],
    shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')!)
    : {},
    paymentMethod: localStorage.getItem('paymentMethod') 
    ? localStorage.getItem('paymentMethod')!
    : 'SadaPak',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    isPaid: false,
  },
}

type Action = 
  | { type: 'SWITCH_MODE' } 
  | { type: 'CART_ADD_ITEM'; payload: CartItem}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SWITCH_MODE':
      return {...state, mode: state.mode === 'dark' ? 'light' : 'dark' }
    case 'CART_ADD_ITEM': 
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item.slug === newItem._id
      )
      const cartItems = existItem
      ? state.cart.cartItems.map((item: CartItem) => 
        item._id === existItem._id ? newItem : item
      )
      : [...state.cart.cartItems, newItem]

      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
          itemsPrice: cartItems.reduce(
            (a: number, c: CartItem) => a + c.price * c.quantity,
            0
          ),
          shippingPrice: cartItems.length > 0 ? 0 : 15,
          taxPrice: 0.15 * cartItems.reduce(
            (a: number, c: CartItem) => a + c.price * c.quantity,
            0
          ),
          totalPrice: cartItems.reduce(
            (a: number, c: CartItem) => a + c.price * c.quantity,
            0
          ) + (cartItems.length > 0 ? 0 : 15) + 0.15 * cartItems.reduce(
            (a: number, c: CartItem) => a + c.price * c.quantity,
            0
          ),
        },
      }
    default:
      return state
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider({ children }: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  );
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}

export { Store, StoreProvider }
