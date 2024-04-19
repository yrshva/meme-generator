import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigation from "./src/navigation/RootNavigation";
import ToastNotification from "./src/components/ToastNotification";

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigation />
        <ToastNotification />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
