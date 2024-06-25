import EmptyMessage from "@/atoms/EmptyMessage";
import Text from "@/atoms/Text";
import { useAuthContext } from "@/context/userContext";
import { convertToBRL } from "@/infra/utils";
import { Order } from "@/interfaces";
import Box from "@/molecules/Box";
import PaginationBox from "@/molecules/PaginationBox";
import { getAllOrders } from "@/services/order/getAllOrders";
import MainBox from "@/templates/MainBox";
import React, { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa6";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const { user } = useAuthContext();

  useEffect(() => {
    takeOrders();
  }, [page]);

  const breadcrumbItems = [
    { title: "Home", path: "/" },
    { title: "Meus pedidos", path: "/me/orders" },
  ];

  const takeOrders = async () => {
    setLoading(true);
    const ordersAndTotal = await getAllOrders({
      page,
      size: 10,
      buyerId: user!.id,
    });
    setOrders(ordersAndTotal.orders);
    setTotal(ordersAndTotal.total);
    setLoading(false);
  };

  const MyOrderItem = ({ order }: { order: Order }) => {
    return (
      <li className="grid w-full grid-cols-3 items-center justify-between bg-white p-4">
        <Box className="flex items-center gap-2 text-gray-500">
          <FaBookOpen />
          <Text Tag="p" className="truncate">
            {order.Books!.map((book) => book.title).join(", ")}
          </Text>
        </Box>
        <Box className="flex items-center justify-center">
          <Text Tag="p" className="text-xs text-gray-600">
            {order.status === "PENDING"
              ? "Aguardando confirmação do vendedor..."
              : order.status === "DISPATCHED"
                ? "Em rota de entrega"
                : "Entregue"}
          </Text>
        </Box>
        <Box className="flex items-center justify-end">
          <Text Tag="p" className="text-green-800">
            {convertToBRL(order.Payment?.valueInBRL || 0)}
          </Text>
        </Box>
      </li>
    );
  };

  return (
    <MainBox
      breadcrumbItems={breadcrumbItems}
      title="Meus pedidos"
      withHeader
      transparent
    >
      <Box className="flex flex-col">
        {!loading && orders && orders.length ? (
          <ul className="mx-auto flex w-[350px] flex-col gap-2 sm:w-[1000px]">
            {orders.map((order) => (
              <MyOrderItem key={order.id} order={order} />
            ))}
          </ul>
        ) : loading ? (
          <p>Carregando...</p>
        ) : (
          <EmptyMessage />
        )}
        <PaginationBox
          page={page}
          size={10}
          total={total}
          onBack={() => setPage((prevValue) => prevValue - 1)}
          onNext={() => setPage((prevValue) => prevValue + 1)}
        />
      </Box>
    </MainBox>
  );
};

export default OrdersPage;
