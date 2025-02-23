import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "@/store/mmkv";
import { Product } from "@/utils/api";

type CartProductEntry = Product & { quantity: number };
export interface CartState {
  products: CartProductEntry[];
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const INITIAL_STATE = {
  products: [],
  total: 0,
  count: 0,
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      addProduct: (product) => {
        set((state) => {
          const hasProduct = state.products.find((p) => p.id === product.id);
          const newTotal = +state.total.toFixed(2) + +product.price.toFixed(2);
          const newCount = state.count + 1;

          let newProducts: CartProductEntry[];
          if (hasProduct) {
            newProducts = state.products.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            );
          } else {
            newProducts = [...state.products, { ...product, quantity: 1 }];
          }

          return {
            products: newProducts,
            total: newTotal,
            count: newCount,
          };
        });
      },

      reduceProduct: (product) => {
        set((state) => {
          const newTotal = +state.total.toFixed(2) - +product.price.toFixed(2);
          const newCount = state.count - 1;

          return {
            products: state.products
              .map((p) => (p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p))
              .filter((p) => p.quantity > 0),
            total: newTotal,
            count: newCount,
          };
        });
      },

      clearCart: () => {
        set(INITIAL_STATE);
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
