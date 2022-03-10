import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NotFound, PrivateRoute } from "./components/conmon";
import { openNotification } from "./components/conmon/toastNotify";
import { AdminLayout } from "./components/layout";
import LoginForm from "./features/auth/Login/LoginForm";
import { CustomerDeTail } from "./features/Customer/CustomerDetail";
import CustomerTable from "./features/Customer/CustomerTable";
import TodoApp from "./features/TodoApp";
import { selectError } from "./redux/errorSlice";
import { useAppSelector } from "./redux/store";

function App() {
  const error = useAppSelector(selectError);
  useEffect(() => {
    if (error.message && error.title) {
      console.log(error);

      openNotification(error.title, error.message);
    }
  }, [error]);
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<AdminLayout />}>
          <Route path="todo" element={<TodoApp />}></Route>
          <Route path="customers" element={<CustomerTable />}></Route>
          <Route path="customers/:id" element={<CustomerDeTail />}></Route>
        </Route>
      </Route>
      {/* No other routes match */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
