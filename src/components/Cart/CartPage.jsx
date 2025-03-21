import React, { useContext, useMemo, memo } from "react";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import "./CartPage.css";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import { checkoutAPI } from "../../services/orderServices";
import { toast } from "react-toastify";

const CartPage = () => {
  const user = useContext(UserContext);
  const { cart, removeFromCart, updateCart, clearCart } =
    useContext(CartContext);

  console.log(user);

  const subTotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  const checkout = () => {
    checkoutAPI()
      .then(() => {
        clearCart();
        toast.success("Order placed successfully");
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      });
  };

  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={user?.profilePic ? `/profile/${user.profilePic}` : remove}
          alt="user profile"
        />
        <div>
          <p className="user_name">Name: {user?.name || "Guest"}</p>
          <p className="user_email">Email: {user?.email || "Not Provided"}</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price.toFixed(2)}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${(quantity * product.price).toFixed(2)}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr className="cart_bill_final">
            <td>Subtotal</td>
            <td>${subTotal.toFixed(2)}</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Shipping Charge</td>
            <td>$5.00</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${(subTotal + 5).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <button
        className="search_button checkout_button"
        onClick={checkout}
        disabled={cart.length === 0}
      >
        Checkout
      </button>
    </section>
  );
};

export default memo(CartPage);
