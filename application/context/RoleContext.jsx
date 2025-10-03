import React, { createContext, useState } from 'react';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState(null); // 'customer' or 'sales'
    const [token, setToken] = useState('')

    return (
        <RoleContext.Provider value={{ role, setRole, token, setToken }}>
            {children}
        </RoleContext.Provider>
    );
};
