import { createContext, useState } from "react";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userdata, setUserdata] = useState({});
  const [config, setConfig] = useState({});

  return (
    <UserContext.Provider value={{ userdata, setUserdata, config, setConfig }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
