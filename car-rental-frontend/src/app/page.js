"use client";

import { AuthProvider } from './AuthContext';
import Landing from './Landing';

export default function Home() {
  return (
    <AuthProvider>
      <Landing />
    </AuthProvider> 
  );
}
