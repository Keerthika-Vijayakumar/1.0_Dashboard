import Dashboard from './pages/Dashboard';
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <Dashboard />
    </NextUIProvider>
  );
}
