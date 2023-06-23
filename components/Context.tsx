import React, { ReactNode } from "react";
import { PlacesContextProvider } from "../contexts";

type Props = {
  children: ReactNode;
};
const Context = ({ children }: Props) => (
  <PlacesContextProvider>{children}</PlacesContextProvider>
);

export default Context;
