"use client"
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/store";

const ProviderRedux = ({ children } : { children:React.ReactNode }) => {
  return (
    <SessionProvider>
        <Provider store={store}>
            {children}
        </Provider>
    </SessionProvider>
  )
}

export default ProviderRedux