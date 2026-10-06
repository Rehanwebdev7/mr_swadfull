import { create } from 'zustand';
import type { Product } from '../data/products';

export interface QuoteItem {
  product: Product;
  quantityKg: number;
}

interface AppState {
  // Theme state
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (val: boolean) => void;

  // Command Palette
  isCommandMenuOpen: boolean;
  setCommandMenuOpen: (open: boolean) => void;
  toggleCommandMenu: () => void;

  // Quick View Drawer (Vaul)
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;

  // B2B Cart / Quote Drawer
  isQuoteDrawerOpen: boolean;
  setQuoteDrawerOpen: (open: boolean) => void;
  quoteItems: QuoteItem[];
  addToQuote: (product: Product, quantityKg?: number) => void;
  removeFromQuote: (productId: string) => void;
  updateQuoteQty: (productId: string, qtyKg: number) => void;
  clearQuote: () => void;

  // CSV Import State (PapaParse)
  importedCsvData: any[] | null;
  setImportedCsvData: (data: any[] | null) => void;
}

export const useStore = create<AppState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => {
    const next = !state.isDarkMode;
    if (typeof document !== 'undefined') {
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
    return { isDarkMode: next };
  }),
  setDarkMode: (val: boolean) => set(() => {
    if (typeof document !== 'undefined') {
      if (val) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
    return { isDarkMode: val };
  }),

  isCommandMenuOpen: false,
  setCommandMenuOpen: (open) => set({ isCommandMenuOpen: open }),
  toggleCommandMenu: () => set((state) => ({ isCommandMenuOpen: !state.isCommandMenuOpen })),

  quickViewProduct: null,
  setQuickViewProduct: (prod) => set({ quickViewProduct: prod }),

  isQuoteDrawerOpen: false,
  setQuoteDrawerOpen: (open) => set({ isQuoteDrawerOpen: open }),
  quoteItems: [],
  addToQuote: (product, quantityKg = 25) =>
    set((state) => {
      const existing = state.quoteItems.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          quoteItems: state.quoteItems.map((i) =>
            i.product.id === product.id
              ? { ...i, quantityKg: i.quantityKg + quantityKg }
              : i
          ),
          isQuoteDrawerOpen: true,
        };
      }
      return {
        quoteItems: [...state.quoteItems, { product, quantityKg }],
        isQuoteDrawerOpen: true,
      };
    }),
  removeFromQuote: (productId) =>
    set((state) => ({
      quoteItems: state.quoteItems.filter((i) => i.product.id !== productId),
    })),
  updateQuoteQty: (productId, qtyKg) =>
    set((state) => ({
      quoteItems: state.quoteItems.map((i) =>
        i.product.id === productId ? { ...i, quantityKg: Math.max(1, qtyKg) } : i
      ),
    })),
  clearQuote: () => set({ quoteItems: [] }),

  importedCsvData: null,
  setImportedCsvData: (data) => set({ importedCsvData: data }),
}));
