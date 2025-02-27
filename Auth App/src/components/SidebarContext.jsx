import React, { createContext, useState } from 'react';

const SidebarContext = createContext({
  sidebarOpen: true,
  setSidebarOpen: () => {},
});

const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>{children}</SidebarContext.Provider>;
};

export { SidebarContext, SidebarProvider };
