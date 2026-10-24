import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext.jsx';

export const renderWithProviders = (
  ui,
  { route = '/', auth = true, ...options } = {}
) => {
  window.history.pushState({}, 'Test page', route);

  const Wrapper = ({ children }) => {
    const routed = <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>;
    return auth ? <AuthProvider>{routed}</AuthProvider> : routed;
  };

  return {
    ...render(ui, { wrapper: Wrapper, ...options })
  };
};

export const renderWithRouter = (ui, { route = '/' } = {}) =>
  renderWithProviders(ui, { route, auth: false });

export * from '@testing-library/react';
