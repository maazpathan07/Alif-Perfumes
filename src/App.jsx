import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

/* Admin Pages */

import Overview from "./pages/admin/Overview";
import AdminProducts from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Orders from "./pages/admin/Orders";
import Testimonials from "./pages/admin/Testimonials";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* Website */}

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

        </Route>

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Admin */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<Overview />}
          />

          <Route
            path="products"
            element={<AdminProducts />}
          />

          <Route
            path="categories"
            element={<Categories />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />

          <Route
            path="testimonials"
            element={<Testimonials />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;