import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NotFound, PrivateRoute } from "./components/conmon";
import { AdminLayout } from "./components/layout";
import LoginForm from "./features/auth/Login/LoginForm";
import { CustomerDeTail } from "./features/Customer/CustomerDetail";
import CustomerTable from "./features/Customer/CustomerTable";
import TodoApp from "./features/TodoApp";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
