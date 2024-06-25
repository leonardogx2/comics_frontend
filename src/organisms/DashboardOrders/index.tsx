import React from "react";
import OrderItem from "../../molecules/OrderItem";
import Text from "@/atoms/Text";
import { OrderStatus } from "@/interfaces";
import EmptyMessage from "@/atoms/EmptyMessage";

interface DashboardOrdersProps {
  data: { title: string; status: OrderStatus; valueInBRL: number }[];
}

const DashboardOrders = ({ data }: DashboardOrdersProps) => {
  const DashboardOrdersHeader = () => {
    return (
      <div className="grid grid-cols-12 p-3 px-4 text-start text-lg font-semibold text-gray-600">
        <p className="col-span-12 md:col-span-5">Nome do quadrinho</p>
        <p className="col-span-12 md:col-span-5">Status</p>
        <p className="col-span-12 md:col-span-2">Valor</p>
      </div>
    );
  };

  return data.length ? (
    <div className="flex h-full w-full flex-col gap-8 rounded bg-white p-4 shadow-lg">
      <Text Tag="h3">Últimos pedidos</Text>
      <div>
        <DashboardOrdersHeader />
        <ul className="flex flex-col">
          {data.map((item) => (
            <OrderItem
              key={item.title}
              title={item.title}
              status={item.status}
              valueInBRL={item.valueInBRL}
            />
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <EmptyMessage />
  );
};

export default DashboardOrders;
