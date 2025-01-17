import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  toggleCart,
} from "../redux/slices/cartSlice";

const CartDropdown = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);

  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Mobile view */}
      <div className="fixed inset-0 z-50 md:hidden">
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => dispatch(toggleCart())}
        />
        <div className="fixed bottom-0 inset-x-0 bg-white rounded-t-2xl shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">Shopping Cart</h2>
            <button
              onClick={() => dispatch(toggleCart())}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="max-h-[60vh] overflow-auto p-4">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Your cart is empty
              </p>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 py-4 border-b last:border-b-0"
                  >
                    <img
                      src={
                        item.images.find((img) => img.isThumbnail)?.url ||
                        item.images[0]?.url
                      }
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              updateQuantity({
                                id: item._id,
                                quantity: Number(e.target.value),
                              })
                            )
                          }
                          className="text-sm border rounded px-2 py-1"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => dispatch(removeFromCart(item._id))}
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {items.length > 0 && (
            <div className="border-t p-4 bg-white">
              <div className="flex justify-between text-sm font-medium text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => dispatch(toggleCart())}
                className="mt-4 block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-lg z-50">
        <div className="p-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Your cart is empty</p>
          ) : (
            <>
              <div className="max-h-[32rem] overflow-auto">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 py-4 border-b last:border-b-0"
                  >
                    <img
                      src={
                        item.images.find((img) => img.isThumbnail)?.url ||
                        item.images[0]?.url
                      }
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              updateQuantity({
                                id: item._id,
                                quantity: Number(e.target.value),
                              })
                            )
                          }
                          className="text-sm border rounded px-2 py-1"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => dispatch(removeFromCart(item._id))}
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm font-medium text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => dispatch(toggleCart())}
                  className="mt-4 block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDropdown;
