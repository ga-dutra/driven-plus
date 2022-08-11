import { createContext, useState } from "react";

const PlansContext = createContext();

const PlansStorage = ({ children }) => {
  const [plansdata, setPlansdata] = useState({});

  return (
    <PlansContext.Provider value={{ plansdata, setPlansdata }}>
      {children}
    </PlansContext.Provider>
  );
};

export { PlansContext, PlansStorage };
