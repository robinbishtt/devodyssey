import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout";
import { getProfileThunk } from "./store/slice/authSlice/auth.thunk";
import { Toaster } from "sonner";
import { applyThemeClass, getStoredTheme } from "./components/utils/theme";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authReducer);

  useEffect(() => {
      dispatch(getProfileThunk());
  }, [dispatch]);

  useEffect(() => {
    const current = getStoredTheme();
    applyThemeClass(current);
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      {loading ? (
        <div className="flex items-center justify-center min-h-screen text-white">
          Loading...
        </div>
      ) : (
        <Layout />
      )}
    </>
  );
}

export default App;
