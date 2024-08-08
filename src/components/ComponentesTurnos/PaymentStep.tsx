import React, { SetStateAction, useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useConfig } from "../../context/AdminContext";
import { useAppointment } from "../../context/ApContext";

interface Props {
  setPaymentReady: React.Dispatch<SetStateAction<boolean>>;
}

const PaymentStep = ({ setPaymentReady }: Props) => {
  const { config, dbUrl, services } = useConfig();
  const { form } = useAppointment()

  useEffect(() => {
    setPaymentReady(false)
    handleBuy();
    //eslint-disable-next-line
  }, []);
  const [preferenceId, setPreferenceId] = useState(null);

  if (!config) return <></>;

  const TOKEN = process.env.REACT_APP_MERCADOPAGO ?? "APP_USR-08e70c66-11de-48fa-9f7d-89571f73b476";
  
  initMercadoPago(TOKEN, { locale: "es-AR" });

  const createPreference = async () => {
    let dateInUTCMinus3 = new Date(form.date.getTime() - (3 * 60 * 60 * 1000));
    let jsonDateInUTCMinus3 = dateInUTCMinus3.toJSON();
    try {
      const response = await axios.post(
        `${dbUrl}/mercadopago/crear-preferencia`,
        {
          title: services?.find(e => form.typeOfService === e._id)?.name,
          quantity: 1,
          price: services?.find(e => form.typeOfService === e._id)?.price,
          appointment: {
            ...form,
            date: jsonDateInUTCMinus3,
            customer: {
              ...form.customer,
              name: form.customer.name.split(" ")[0],
              lastname: form.customer.name.split(" ")[1] ?? ""
            }
          },
          origin: window.location.origin
        }
      );
      const { id } = response.data;
      return id
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };


  return (
    <div id="wallet_container">
      {preferenceId && (
        <Wallet onReady={() => setPaymentReady(true)} initialization={{ preferenceId: preferenceId }} />
      )}
    </div>
  );
};

export default PaymentStep;
