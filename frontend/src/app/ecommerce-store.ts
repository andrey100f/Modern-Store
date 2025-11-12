import {Product} from './models/product.model';
import {patchState, signalMethod, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {produce} from 'immer';
import {ToasterService} from './services/toaster.service';
import {CartItem} from './models/cart-item.model';
import {MatDialog} from '@angular/material/dialog';
import {SignInDialogComponent} from './components/sign-in-dialog/sign-in-dialog.component';
import {SignInParams, SignUpParams, User} from './models/user.model';
import {Router} from '@angular/router';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root'
  },
  withState({
    products: [
      {
        id: 'ccffb056-57c3-4ea8-802b-b6b07daa0b7f',
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 6,
        inStock: true,
        category: 'electronics'
      },
      {
        id: 'cb3c947b-5fee-40a2-849f-0e6d687159dc',
        name: 'Smart 4K TV',
        description: '65-inch OLED Smart TV with HDR and built-in streaming apps',
        price: 1299.99,
        imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=400&q=80',
        rating: 4.6,
        reviewCount: 6,
        inStock: true,
        category: 'electronics'
      },
      {
        id: 'ac7a14db-fa96-4d22-b695-cefe8265f37d',
        name: 'Professional Camera',
        description: 'Mirrorless digital camera with 4K video capabilities',
        price: 899.99,
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&w=400&q=80',
        rating: 4.7,
        reviewCount: 6,
        inStock: true,
        category: 'electronics'
      },
      {
        id: '9fcc43e7-f6c2-41be-be88-cb2f3218357c',
        name: 'Classic Denim Jacket',
        description: 'Vintage-style denim jacket with modern fit',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&w=400&q=80',
        rating: 4.5,
        reviewCount: 5,
        inStock: true,
        category: 'clothing'
      },
      {
        id: 'ebb802bd-09cf-4d6e-b914-2ba41219e9f4',
        name: 'Cotton T-Shirt Pack',
        description: 'Set of 3 premium cotton t-shirts in essential colors',
        price: 34.99,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=400&q=80',
        rating: 4.3,
        reviewCount: 6,
        inStock: true,
        category: 'clothing'
      },
      {
        id: '16aeec33-a5f1-485c-b070-e5824545e7f2',
        name: 'Wool Winter Coat',
        description: 'Elegant wool-blend coat perfect for cold weather',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&w=400&q=80',
        rating: 4.6,
        reviewCount: 6,
        inStock: true,
        category: 'clothing'
      },
      {
        id: '16f984ef-8a80-4f24-90e5-aaa0429b3b9c',
        name: 'Leather Watch',
        description: 'Classic analog watch with genuine leather strap',
        price: 149.99,
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&w=400&q=80',
        rating: 4.7,
        reviewCount: 5,
        inStock: true,
        category: 'accessories'
      },
      {
        id: 'effbb6ee-7acb-45fc-87d0-f348c836e960',
        name: 'Designer Sunglasses',
        description: 'UV-protected polarized sunglasses with premium frame',
        price: 129.99,
        imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&w=400&q=80',
        rating: 4.4,
        reviewCount: 6,
        inStock: true,
        category: 'accessories'
      },
      {
        id: '52c28c19-a141-442a-ab9e-a40a98939704',
        name: 'Leather Wallet',
        description: 'Handcrafted leather wallet with RFID protection',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&w=400&q=80',
        rating: 4.5,
        reviewCount: 6,
        inStock: true,
        category: 'accessories'
      },
      {
        id: 'dedb7459-f788-4c9f-8b32-ff56ba40a135',
        name: 'Smart Coffee Maker',
        description: 'WiFi-enabled coffee maker with programmable brewing',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&w=400&q=80',
        rating: 4.7,
        reviewCount: 5,
        inStock: true,
        category: 'home'
      },
      {
        id: '5182c764-64dd-4357-a700-3dc7c4286430',
        name: 'Air Purifier',
        description: 'HEPA air purifier with air quality monitoring',
        price: 249.99,
        imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 5,
        inStock: true,
        category: 'home'
      },
      {
        id: 'f605b114-eb91-4e01-97e2-21e262a919a8',
        name: 'Robot Vacuum',
        description: 'Smart robot vacuum with mapping and scheduling',
        price: 399.99,
        imageUrl: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&w=400&q=80',
        rating: 4.6,
        reviewCount: 6,
        inStock: false,
        category: 'home'
      }
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined
  } as EcommerceState),
  withComputed(({ category, products, wishlistItems, cartItems }) => ({
    filteredProducts: computed(() => {
      if (category() === 'all') {
        return products();
      }

      return products().filter(p => p.category === category().toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0))
  })),
  withMethods((store, toaster = inject(ToasterService), matDialog = inject(MatDialog), router = inject(Router)) => ({
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, { category })
    }),
    addToWishlist: (product: Product) => {
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find((p) => p.id === product.id)) {
          draft.push(product);
        }
      });

      patchState(store, { wishlistItems: updatedWishlistItems });
      toaster.success('Product added to wishlist');
    },

    removeFromWishlist: (product: Product) => {
      patchState(store, { wishlistItems: store.wishlistItems().filter(p => p.id !== product.id) });
      toaster.success('Product removed from wishlist');
    },

    clearWishlist: () => {
      patchState(store, { wishlistItems: [] });
      toaster.success('Wishlist cleared');
    },

    addToCart: (product: Product, quantity = 1) => {
      const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);
      const updatedCartItems = produce(store.cartItems(), (draft) => {
        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity += quantity;
          return;
        }

        draft.push({ product, quantity });
      });

      patchState(store, { cartItems: updatedCartItems });
      toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to cart');
    },

    setItemQuantity(params: { productId: string, quantity: number }) {
      const index = store.cartItems().findIndex(c => c.product.id === params.productId);
      const updated = produce(store.cartItems(), (draft) => {
        draft[index].quantity = params.quantity;
      });

      patchState(store, { cartItems: updated });
    },

    addAllWishlistToCart: () => {
      const updatedCartItems = produce(store.cartItems(), (draft) => {
        store.wishlistItems().forEach(p => {
          if (!draft.find(c => c.product.id === p.id)) {
            draft.push({ product: p, quantity: 1 });
          }
        });
      });

      patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
    },

    moveToWishlist: (product: Product) => {
      const updatedCartItems = store.cartItems().filter(p => p.product.id !== product.id);
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find(p => p.id === product.id)) {
          draft.push(product);
        }
      });

      patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
    },

    removeFromCart: (product: Product) => {
      const updatedCartItems = store.cartItems().filter(c => c.product.id !== product.id);
      patchState(store, { cartItems: updatedCartItems });
    },

    proceedToCheckout: () => {
      if (!store.user()) {
        matDialog.open(SignInDialogComponent, {
          disableClose: true,
          data: {
            checkout: true
          }
        });
        return;
      }

      router.navigate(['/checkout']);
    },

    signIn: (params: SignInParams, checkout: boolean, dialogId: string) => {
      patchState(store, {
        user: {
          id: '20b39217-6599-4494-b224-558d0ed1ff34',
          email: params.email,
          name: 'John Doe',
          imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
        }
      });

      matDialog.getDialogById(dialogId)?.close();

      if (checkout) {
        router.navigate(['/checkout']);
      }
    },

    signOut: () => {
      patchState(store, { user: undefined });
    },

    signUp: (params: SignUpParams, checkout: boolean, dialogId: string) => {
      patchState(store, {
        user: {
          id: '20b39217-6599-4494-b224-558d0ed1ff34',
          email: params.email,
          name: 'John Doe',
          imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
        }
      });

      matDialog.getDialogById(dialogId)?.close();

      if (checkout) {
        router.navigate(['/checkout']);
      }
    },
  }))
);
