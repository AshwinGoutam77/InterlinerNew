import React, { createContext, useState } from 'react';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState(null); // 'customer' or 'sales'

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
};
