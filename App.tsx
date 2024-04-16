import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RootNavigation from "./src/navigation/RootNavigation";

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
}

export default App;
