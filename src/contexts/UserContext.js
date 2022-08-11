import { createContext, useState } from "react";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userdata, setUserdata] = useState({});
  return (
    <UserContext.Provider value={{ userdata, setUserdata }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
