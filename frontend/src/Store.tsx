import React from 'react'
import type { Cart, CartItem, ShippingAddress } from './types/Cart'
import type { UserInfo } from './types/UserInfo'

type AppState = {
  mode: string
  cart: Cart
  userInfo?: UserInfo
}

const initialState: AppState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,

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
    : 'SadaPay',
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
  | { type: 'CART_REMOVE_ITEM'; payload: CartItem}
  | { type: 'USER_SIGNIN'; payload: UserInfo }
  | { type: 'USER_SIGNOUT' }
  | { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAddress }
  | { type: 'SAVE_PAYMENT_METHOD'; payload: string }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SWITCH_MODE':
      localStorage.setItem('mode', state.mode === 'dark' ? 'light' : 'dark')
      return {...state, mode: state.mode === 'dark' ? 'light' : 'dark' }
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      );
      let cartItems;
      if (existItem) {
        cartItems = state.cart.cartItems.map((item: CartItem) =>
          item._id === existItem._id
            ? { ...item, quantity: newItem.quantity } // update quantity only
            : item
        );
      } else {
        cartItems = [...state.cart.cartItems, newItem];
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
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
          totalPrice:
            cartItems.reduce(
              (a: number, c: CartItem) => a + c.price * c.quantity,
              0
            ) +
            (cartItems.length > 0 ? 0 : 15) +
            0.15 * cartItems.reduce(
              (a: number, c: CartItem) => a + c.price * c.quantity,
              0
            ),
        },
      };
    }
      case 'CART_REMOVE_ITEM': {
        const cartItems = state.cart.cartItems.filter(
          (item: CartItem) => item._id !== action.payload._id
        )
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        return {...state, cart: {...state.cart, cartItems}}
      }
    case 'USER_SIGNIN':
      return {...state, userInfo: action.payload}

    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: undefined,
        cart: {
          cartItems: [],
          paymentMethod: 'SadaPay',
          shippingAddress: {
            fullName: '',
            address: '',
            city: '',
            postalCode: '',
            country: '',
          },
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
          isPaid: false
        },
      }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      }
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
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

function StoreProvider({ children }: React.PropsWithChildren<object>) {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState
  );
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}

export { Store, StoreProvider }
