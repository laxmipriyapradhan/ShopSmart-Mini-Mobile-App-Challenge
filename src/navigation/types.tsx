export type RootTabParamList = {
    HOME_STACK: undefined;
    REORDER: undefined;
    CART: undefined;
    ACCOUNT: undefined;
  };
  
  export type HomeStackParamList = {
    HOME: undefined;
    PRODUCT_DETAILS: {
      item: {
        id: string;
        title: string;
        price: number;
        image: string;
      };
    };
  };

  export type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    isFavorite: boolean;
  };
  