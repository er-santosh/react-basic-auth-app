import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Layout>
      <ToastContainer
        transition={Slide}
        pauseOnFocusLoss={false}
        autoClose={3000}
      />
      <Routes>
        <Route path="/" element={<HomePage />} exact></Route>
        <Route
          path="/auth"
          element={
            <ProtectedRoute guest>
              <AuthPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfile />}></Route>
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Layout>
  );
}

export default App;
