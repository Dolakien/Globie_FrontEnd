import { Empty, message, Modal, Popconfirm, Radio, Space } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../utils/formatPrice";
import {
  removeCart,
  removeProduct,
  updateQuantity,
} from "../../store/cartSlice";
import classNames from "classnames";
import { useMutation, useQuery } from "@tanstack/react-query";
import shippingAddressApi from "../../api/shippingAddressApi";
import { PAYMENT_METHOD, TOKEN_STORAGE_KEY } from "../../constants";
import paymentApi from "../../api/paymentApi";

const CartRow = ({ data, step }) => {
  const dispatch = useDispatch();

  const onUpdateQuantity = (qnt) => {
    if (qnt > 0) {
      dispatch(
        updateQuantity({
          productId: data.productId,
          amount: qnt,
        })
      );
    }
  };

  return (
    <tr>
      <td className="py-3">
        <div className="flex items-center gap-3">
          <img
            src={data.image}
            alt="Product img"
            className="rounded-lg border border-[#D9D9D9] object-cover w-20 h-20"
          />

          <p className="text-[#262626] font-bold">{data.name}</p>
        </div>
      </td>

      <td className="text-[#555555]">{formatPrice(data.price)}đ</td>

      <td>
        <div
          className={classNames("rounded inline-flex", {
            border: step === "CART",
          })}
        >
          {step === "CART" && (
            <FaMinus
              className="m-3 cursor-pointer"
              onClick={() => onUpdateQuantity(data.amount - 1)}
            />
          )}

          <input
            type="text"
            className="w-12 text-center outline-none"
            value={data.amount}
            readOnly
          />

          {step === "CART" && (
            <FaPlus
              className="m-3 cursor-pointer"
              onClick={() => onUpdateQuantity(data.amount + 1)}
            />
          )}
        </div>
      </td>

      <td className="text-[#555555]">
        {formatPrice(data.amount * data.price)}đ
      </td>

      <td>
        <Popconfirm
          title="Remove product?"
          onConfirm={() => dispatch(removeProduct(data.productId))}
        >
          <FaRegTrashAlt className="text-[#7B7B7B] cursor-pointer" />
        </Popconfirm>
      </td>
    </tr>
  );
};

const Cart = () => {
  const isLogged = localStorage.getItem(TOKEN_STORAGE_KEY);
  const dispatch = useDispatch();

  const [step, setStep] = useState("CART");
  const [modalOpen, setModalOpen] = useState(false);
  const [shippingId, setShippingId] = useState();

  const onVisible = () => setModalOpen(!modalOpen);

  const { data: shippingAddress } = useQuery({
    queryKey: ["SHIPPING_ADDRESS"],
    queryFn: async () => {
      const res = await shippingAddressApi.getMyShippingAddress();

      return res.data?.data ?? [];
    },
    enabled: !!isLogged,
  });

  useEffect(() => {
    if (shippingAddress?.length > 0) {
      const defaultAdd = shippingAddress.find((it) => it.status);
      setShippingId(defaultAdd.shippingId);
    }
  }, [shippingAddress]);

  const { mutate: onPayment } = useMutation({
    mutationKey: ["CREATE_ORDER"],
    mutationFn: async (data) => {
      const res = await paymentApi.createPaymentUrl(data);

      return res.data.data;
    },
    onSuccess: (data) => {
      dispatch(removeCart());
      window.location.href = data.paymentUrl;
    },
    onError: () => {
      message.error("An error occurred, please try again");
    },
  });

  const products = useSelector((state) => state.cart.products);

  const totalPrice = useMemo(() => {
    return products.reduce((res, curr) => (res += curr.amount * curr.price), 0);
  }, [products]);

  const onCheckoutClick = () => {
    if (step === "CART") {
      setStep("CHECKOUT");
    } else {
      if (!shippingId) {
        message.info("Please select delivery address");
        return;
      }

      const payload = {
        paymentMethodOrder: PAYMENT_METHOD.ELECTRONIC_PAYMENT,
        shippingId,
        productOrders: products.map((it) => ({
          productId: it.productId,
          amount: it.amount,
        })),
      };

      onPayment(payload);
    }
  };

  if (!products.length) {
    return <Empty className="my-36" />;
  }

  return (
    <>
      <div className="container mx-auto px-3 my-12">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-[#262626]">Cart</p>

              {step === "CHECKOUT" && (
                <button
                  onClick={onVisible}
                  className="flex items-center bg-orange-500 rounded-md p-3 gap-x-2 text-white text-sm font-semibold"
                >
                  <FaPlus />

                  <p>Select address</p>
                </button>
              )}
            </div>

            <table className="w-full mt-4">
              <tbody>
                {products.map((it, index) => (
                  <CartRow step={step} key={index} data={it} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-span-4">
            <div className="bg-[#E9E9E9] rounded-xl px-6 py-6">
              <p className="text-[#262626] font-bold mb-3">Order Summary</p>

              <div className="flex items-center justify-between mb-3">
                <p className="text-[#555555]">Price</p>
                <p className="text-[#262626]">{formatPrice(totalPrice)}đ</p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <p className="text-[#555555]">Shipping</p>
                <p className="text-[#262626]">$99.23</p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <p className="text-[#555555]">Tax</p>
                <p className="text-[#262626]">$99.23</p>
              </div>

              <div className="flex items-center justify-between mb-3 border-t border-t-[#D9D9D9] pt-3">
                <p className="text-[#262626] font-bold">Total Price</p>
                <p className="text-[#262626] font-bold">
                  {formatPrice(totalPrice)}đ
                </p>
              </div>

              <button
                onClick={onCheckoutClick}
                className="rounded-lg py-3 text-white uppercase bg-[#434343] w-full mt-4 cursor-pointer"
              >
                {step === "CART" ? "Checkout" : "PAYMENT"}
              </button>
            </div>

            {step === "CART" && (
              <div className="mt-6 flex items-center h-12">
                <input
                  type="text"
                  className="flex-1 border-l border-y border-[#7B7B7B] outline-none h-full rounded-l-lg px-3 placeholder:text-sm"
                  placeholder="Enter coupon code"
                />

                <button className="bg-[#262626] rounded-r-lg h-full px-4 text-white text-sm font-semibold">
                  Apply code
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onCancel={onVisible}
        title="Select delivery address"
        onOk={onVisible}
      >
        <Radio.Group
          name="shippingId"
          // onChange={(e) => {
          //   const shippingId = e.target.value;
          //   setShippingId(shippingId);
          // }}
          value={shippingId}
        >
          <Space direction="vertical">
            {shippingAddress?.map((it) => {
              return (
                <Radio value={it.shippingId} key={it.shippingId}>
                  <p>{it.address}</p>
                  <p>{it.phone}</p>
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
      </Modal>
    </>
  );
};

export default Cart;
