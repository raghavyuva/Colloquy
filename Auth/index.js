import React from "react";

import Routes from './Authnav';
import { AuthProvider } from "./AuthProvider";

/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
  );
}
