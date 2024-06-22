import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex">
        <Sidebar />
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}
