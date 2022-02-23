import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LogoLogin from "../../assets/LogoLogin.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  email: string;
  password: string;
}
const schema = yup
  .object({
    email: yup.string().trim().required().email(),
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
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);
  return (
    <div className="flex items-center justify-center  bg-gray-100  ">
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
                className={`block ${errors.email && "text-red-600"}`}
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                className={`input-form ${errors.email && "focus:ring-red-600"}`}
                {...register("email")}
                name="email"
              />
              <p className="error-message">{errors.email?.message}</p>
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
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
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
