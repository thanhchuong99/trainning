import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import LogoLogin from "../../../assets/LogoLogin.svg";
import { useAuth } from "../Context/authContext";

// yup.setLocale({
//   mixed: {
//     required: "Vui lòng điền vào trường này để tiếp tục",
//   },
//   string: {
//     min: "Mật khẩu tối thiểu ${min} ký tự",
//     email: "Email không hợp lệ",
//   },
// });
interface IFormInputs {
  username: string;
  password: string;
}
const schema = yup
  .object({
    username: yup.string().trim().required().email(),
    password: yup.string().trim().required().min(6),
  })
  .required();
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  let location = useLocation();
  let stateLocation = location.state as {
    from: { pathname: string };
  };
  let from = stateLocation?.from?.pathname || "/";

  const { isLogged, loading, signIn, verifyTokenEffect } = useAuth();
  const onSubmit: SubmitHandler<IFormInputs> = ({ username, password }) => {
    signIn(username, password);
  };
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    if (isLogged) {
      verifyTokenEffect();
      navigate(from);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  return (
    <div className="flex bg-gray-100 justify-center h-full mt-[40px]">
      <div className="px-8 py-6 mt-8 w-[600px] h-full shadow-md text-left bg-white ">
        <div className="flex justify-center">
          <img src={LogoLogin} alt="Logo" className="h-[50px] w-[200px] mr-8" />
        </div>
        <h3 className="text-2xl font-bold text-center">
          Login Form with Tailwincss, React-hook-form and Yup
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div>
              <label
                className={`block ${errors.username && "text-red-600"}`}
                htmlFor="email"
              >
                User Name
              </label>
              <input
                type="text"
                placeholder="UserName"
                className={`input-form ${
                  errors.username && "focus:ring-red-600"
                }`}
                {...register("username")}
                name="username"
              />
              <p className="error-message">{errors.username?.message}</p>
            </div>
            <div className="mt-4">
              <label
                className={`block ${errors.password && "text-red-600"}`}
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className={`input-form ${
                  errors.password && "focus:ring-red-600"
                }`}
                {...register("password")}
                name="password"
              />{" "}
              <p className="error-message">{errors.password?.message}</p>
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-16 text-white bg-blue-600 rounded-lg hover:bg-blue-900 flex items-center">
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                Login
              </button>
              <Link to="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
