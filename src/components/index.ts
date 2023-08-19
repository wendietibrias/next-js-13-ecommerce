//global component
import Navbar from "./Navbar";
import Footer from "./Footer";

//home
import Banner from "./home/Banner";
import RecommendedProduct from "./home/RecommendedProduct";
import AllProduct from "./home/AllProduct";
import ProductCard from "./home/ProductCard";

//cart
import CartItems from "./cart/CartItems";
import CartSummary from "./cart/CartSummary";
import CartItemCard from "./cart/CartItemCard";

//favorite
import FavoriteItems from "./favorite/FavoriteItems";
import FavoriteItemCard from "./favorite/FavoriteItemCard";

//detail product
import ProductDetailDisplay from "./productDetail/ProductDetailDisplay";

//auth
import RegisterForm from "./auth/RegisterForm";
import LoginForm from "@/components/auth/LoginForm";

//alert 
import Alert from "./Alert";

//checkout
import CheckoutForm from "./checkout/CheckoutForm";
import CheckoutItems from "./checkout/CheckoutItems";

//transaction
import TransactionItems from "./transaction/history/TransactionItems";
import TransactionDetailitems from "./transaction/detail/TransactionDetailItems";

export {
    Banner,
    Navbar,
    RecommendedProduct,
    ProductCard,
    AllProduct,
    Footer,
    CartItemCard,
    CartItems,
    CartSummary,
    ProductDetailDisplay,
    FavoriteItems,
    LoginForm,
    RegisterForm,
    Alert,
    CheckoutForm,
    CheckoutItems,
    TransactionItems,
    TransactionDetailitems
}