import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './pages/HomePage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { store } from './features/store.ts'
import CartPage from './pages/CartPage.tsx'
import SignInPage from './pages/SignInPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import ShippingAddressPage from './pages/ShippingAddressPage.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="/product/:slug" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/shippingAddress" element={<ShippingAddressPage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
)
