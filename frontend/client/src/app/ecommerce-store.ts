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
import {Order} from './models/order.model';
import {withStorageSync} from '@angular-architects/ngrx-toolkit';

export type EcommerceState = {
  category: string | undefined;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root'
  },
  withState({
    category: undefined,
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
  } as EcommerceState),
  withStorageSync({ key: 'modern-store', select: ({ wishlistItems, cartItems, user}) => ({ wishlistItems, cartItems, user}) }),
  withComputed(({ category, wishlistItems, cartItems }) => ({
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
  })),
  withMethods((store, toaster = inject(ToasterService), matDialog = inject(MatDialog), router = inject(Router)) => ({
    // setCategory: signalMethod<string | undefined>((category: string | undefined) => {
    //   patchState(store, { category })
    // }),
    // addToWishlist: (product: Product) => {
    //   const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
    //     if (!draft.find((p) => p.id === product.id)) {
    //       draft.push(product);
    //     }
    //   });
    //
    //   patchState(store, { wishlistItems: updatedWishlistItems });
    //   toaster.success('Product added to wishlist');
    // },
    //
    // removeFromWishlist: (product: Product) => {
    //   patchState(store, { wishlistItems: store.wishlistItems().filter(p => p.id !== product.id) });
    //   toaster.success('Product removed from wishlist');
    // },
    //
    // clearWishlist: () => {
    //   patchState(store, { wishlistItems: [] });
    //   toaster.success('Wishlist cleared');
    // },

    // addToCart: (product: Product, quantity = 1) => {
    //   const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);
    //   const updatedCartItems = produce(store.cartItems(), (draft) => {
    //     if (existingItemIndex !== -1) {
    //       draft[existingItemIndex].quantity += quantity;
    //       return;
    //     }
    //
    //     draft.push({ product, quantity });
    //   });
    //
    //   patchState(store, { cartItems: updatedCartItems });
    //   toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to cart');
    // },

    // setItemQuantity(params: { productId: string, quantity: number }) {
    //   const index = store.cartItems().findIndex(c => c.product.id === params.productId);
    //   const updated = produce(store.cartItems(), (draft) => {
    //     draft[index].quantity = params.quantity;
    //   });
    //
    //   patchState(store, { cartItems: updated });
    // },

    // addAllWishlistToCart: () => {
    //   const updatedCartItems = produce(store.cartItems(), (draft) => {
    //     store.wishlistItems().forEach(p => {
    //       if (!draft.find(c => c.product.id === p.id)) {
    //         draft.push({ product: p, quantity: 1 });
    //       }
    //     });
    //   });
    //
    //   patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
    // },

    // moveToWishlist: (product: Product) => {
    //   const updatedCartItems = store.cartItems().filter(p => p.product.id !== product.id);
    //   const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
    //     if (!draft.find(p => p.id === product.id)) {
    //       draft.push(product);
    //     }
    //   });
    //
    //   patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
    // },

    // removeFromCart: (product: Product) => {
    //   const updatedCartItems = store.cartItems().filter(c => c.product.id !== product.id);
    //   patchState(store, { cartItems: updatedCartItems });
    // },

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

    // signIn: (params: SignInParams, checkout: boolean, dialogId: string) => {
    //   patchState(store, {
    //     user: {
    //       id: '20b39217-6599-4494-b224-558d0ed1ff34',
    //       email: params.email,
    //       name: 'John Doe',
    //       imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
    //     }
    //   });
    //
    //   matDialog.getDialogById(dialogId)?.close();
    //
    //   if (checkout) {
    //     router.navigate(['/checkout']);
    //   }
    // },

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

    placeOrder: async () => {
      patchState(store, { loading: true });

      const user = store.user();

      if (!user) {
        toaster.error('Please login before placing an order');
        patchState(store, { loading: false });
        return;
      }

      // const order: Order = {
      //   id: crypto.randomUUID(),
      //   userId: user?.id || '',
      //   total: Math.round(store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)),
      //   items: store.cartItems(),
      //   paymentStatus: 'success'
      // };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      patchState(store, { loading: false, cartItems: [] });
      router.navigate(['/order-success']);
    }
  }))
);
