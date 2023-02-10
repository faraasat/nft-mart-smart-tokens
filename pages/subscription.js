import React from "react";

//INTERNAL IMPORT
import Style from "../styles/subscription.module.css";
import Subscription from "../Subscription/Subscription";
const subscription = () => {
  const subscriptionArray = [
    {
      plan: "STARTER",
      price: "$5/mo",
      popular: "",
      service: ["10 Mints", "Faster Processing"],
      info: "Pan Details",
    },
    {
      plan: "BASIC",
      price: "$15/mo",
      popular: "POPULAR",
      service: [
        "Everything in Starter",
        "100 Mints",
        "Progress Reports",
      ],

      info: "Pan Details",
    },
    {
      plan: "PLUS",
      price: "$25/mo",
      popular: "",
      service: [
        "Everything in Basic",
        "Unlimited Mints",
        "Custom Profile",
        "Advanced Analytics",
      ],

      info: "Pan Details",
    },
  ];
  return (
    <div className={Style.Subscription}>
      <div className={Style.Subscription_box}>
        <div className={Style.Subscription_box_info}>
          <h1>💎 Subscription</h1>
          <p>Pricing that fits any of you needs.</p>
        </div>

        <div className={Style.Subscription_box_box}>
          {subscriptionArray.map((el, i) => (
            <Subscription key={i + 1} i={1} el={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default subscription;
