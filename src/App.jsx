import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";

/* Lazy Loaded Public Pages */
const Home           = lazy(() => import("./pages/Home"));
const Products       = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const About          = lazy(() => import("./pages/About"));
const Contact        = lazy(() => import("./pages/Contact"));
const Login          = lazy(() => import("./pages/Login"));
const NotFound       = lazy(() => import("./pages/NotFound"));

/* Lazy Loaded Admin Pages */
const Dashboard      = lazy(() => import("./pages/Dashboard"));
const Overview       = lazy(() => import("./pages/admin/Overview"));
const AdminProducts  = lazy(() => import("./pages/admin/Products"));
const Categories     = lazy(() => import("./pages/admin/Categories"));
const Orders         = lazy(() => import("./pages/admin/Orders"));
const Testimonials   = lazy(() => import("./pages/admin/Testimonials"));
const Settings       = lazy(() => import("./pages/admin/Settings"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner text="Loading..." />}>
        <Routes>

          {/* Website */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;