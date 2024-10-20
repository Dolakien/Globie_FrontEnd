import { Button, Empty, message, Popconfirm } from "antd";
import AddAddressModal from "./AddAddressModal";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import shippingAddressApi from "../../../api/shippingAddressApi";

const AddressItem = (props) => {
  const { data, refetch } = props;

  const { mutate: onRemoveAddress } = useMutation({
    mutationKey: ["DELETE_ADDRESS"],
    mutationFn: (id) => {
      return shippingAddressApi.removeAddress(id);
    },
    onSuccess: refetch,
    onError: (error) => {
      message.error(error?.response?.data?.message);
    },
  });

  const { mutate: onUpdateAddress } = useMutation({
    mutationKey: ["UPDATE_ADDRESS"],
    mutationFn: ({ id, payload }) => {
      return shippingAddressApi.updateAddress(id, payload);
    },
    onSuccess: refetch,
  });

  const onSetAsDefault = () => {
    onUpdateAddress({
      id: data.shippingId,
      payload: {
        status: true,
      },
    });
  };

  return (
    <div className="py-5 border-t border-[#cfcfcf] flex items-center justify-between gap-x-4">
      <div className="text-[14px] flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {data.status && (
            <p className="border border-[#e30019] rounded h-7 px-2 text-[#e30019] flex items-center">
              Default
            </p>
          )}

          <p className="text-[#535353]">{data.phone}</p>
        </div>

        <p className="text-[#535353] mt-2">{data.address}</p>
      </div>

      <div>
        <div className="flex items-center gap-x-3 justify-end text-[14px] mb-2 text-[#1982f9]">
          {!data.status && (
            <Popconfirm
              title="Remove address"
              description="Are you sure you want to remove this address?"
              onConfirm={() => onRemoveAddress(data.shippingId)}
            >
              <p className="cursor-pointer">Delete</p>
            </Popconfirm>
          )}
        </div>

        {!data.status && (
          <Button onClick={onSetAsDefault}>Set as default</Button>
        )}
      </div>
    </div>
  );
};

const ProfileAddress = () => {
  const [openModal, setOpenModal] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["USER_ADDRESS"],
    queryFn: async () => {
      const r = await shippingAddressApi.getMyShippingAddress();

      return r.data.data;
    },
  });

  return (
    <>
      <div className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-[24px] font-semibold text-[#333] leading-tight">
          Shipping Address
        </h2>

        <Button
          type="primary"
          className="h-9"
          onClick={() => setOpenModal(true)}
        >
          + Add new
        </Button>
      </div>

      <div className="px-6 py-4">
        {data &&
          data.length > 0 &&
          data.map((it) => (
            <AddressItem refetch={refetch} key={it.shippingId} data={it} />
          ))}

        {data?.length === 0 && <Empty />}
      </div>

      <AddAddressModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={refetch}
      />
    </>
  );
};

export default ProfileAddress;
