import { convertToBRL } from "@/infra/utils";
import { OrderStatus } from "@/interfaces";
import React from "react";

interface OrderItemProps {
  title: string;
  status: OrderStatus;
  valueInBRL: number;
}

const OrderItem = ({ title, status, valueInBRL }: OrderItemProps) => {
  return (
    <li className="grid grid-cols-12 p-4 text-sm text-gray-600 odd:bg-gray-100 even:bg-gray-50">
      <p className="col-span-12 md:col-span-5">{title}</p>
      <p className="col-span-12 md:col-span-5">
        {status === "DELIVERED"
          ? "Entregue"
          : status === "DISPATCHED"
            ? "Dispachado"
            : "Em rota de entrega"}
      </p>
      <p className="col-span-12 md:col-span-2">{convertToBRL(valueInBRL)}</p>
    </li>
  );
};

export default OrderItem;
