"use client";

import { Provider } from "jotai";
import { FC, ReactNode } from "react";

interface JotaiProviderPropsType {
  children: ReactNode;
}

export const JotaiProvider: FC<JotaiProviderPropsType> = ({ children }) => {
  return <Provider>{children}</Provider>;
};
