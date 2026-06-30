"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { User, Eye, EyeOff } from "lucide-react";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/store/features/auth/api";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "@/store/features/auth/slice";
import { RootState } from "@/store/index";
import { toast } from "sonner";
import { Constants } from "@/utils/app.constant";
import Image from "next/image";

type FormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  remember?: boolean;
};

type MutationError = {
  data?: {
    message?: string;
  };
};
/* ================= VALIDATION ================= */

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const RegisterSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

/* ================= COMPONENT ================= */

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"login" | "register">("login");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] =
    useState(false);

  /* ✅ FIX TS ISSUE */
  const isLogin = view === "login";

  /* ✅ Dynamic config */
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  };

  const validationSchema = isLogin ? LoginSchema : RegisterSchema;

  const handleSubmit = async (values: FormValues) => {
    try {
      if (isLogin) {
        const res = await login({
          email: values.email!,
          password: values.password!,
        }).unwrap();
        if (res.data) {
          dispatch(
            setCredentials({
              user: res.data.user,
              token: res.data.access.token,
            }),
          );
          localStorage.setItem(
            Constants.ACCESS_TOKEN,
            JSON.stringify(res.data.access),
          );
          localStorage.setItem(
            Constants.REFRESH_TOKEN,
            JSON.stringify(res.data.refresh),
          );
          localStorage.setItem(
            Constants.USER_INFO,
            JSON.stringify(res.data.user),
          );
          toast.success(res.message || "Logged in successfully!", {
            position: "bottom-right",
            style: {
              background: "#2e7d32",
              color: "#fff",
              fontWeight: "bold",
            },
          });
          setIsOpen(false);
        }
      } else {
        const res = await register({
          firstName: values.firstName!,
          lastName: values.lastName!,
          email: values.email!,
          password: values.password!,
        }).unwrap();

        if (res.data) {
          dispatch(
            setCredentials({
              user: res.data.user,
              token: res.data.access.token,
            }),
          );
          localStorage.setItem(
            Constants.ACCESS_TOKEN,
            JSON.stringify(res.data.access),
          );
          localStorage.setItem(
            Constants.REFRESH_TOKEN,
            JSON.stringify(res.data.refresh),
          );
          localStorage.setItem(
            Constants.USER_INFO,
            JSON.stringify(res.data.user),
          );
          toast.success(res.message || "Registration successful!", {
            position: "bottom-right",
            style: {
              background: "#2e7d32",
              color: "#fff",
              fontWeight: "bold",
            },
          });
          setIsOpen(false);
        }
      }
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof (error as MutationError).data?.message === "string"
          ? (error as MutationError).data?.message
          : "Something went wrong!";

      toast.error(message, {
        position: "bottom-right",
        style: {
          background: "#bb2124",
          color: "#fff",
          fontWeight: "bold",
        },
      });
    }
  };

  if (mounted && user) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div
            className="cursor-pointer flex items-center gap-2"
            title="Click to logout"
          >
            <div className="w-8 h-8 rounded-full bg-transparent border border-gray-400 flex items-center justify-center text-[#333333] font-semibold text-sm">
              {user.firstName?.charAt(0)?.toUpperCase()}
              {user.lastName?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>
              {/* Are you sure you want to log out of your account? */}
              আপনি কি সত্যিই লগ আউট করতে চান?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
              onClick={() => {
                dispatch(logout());
                localStorage.removeItem(Constants.ACCESS_TOKEN);
                localStorage.removeItem(Constants.REFRESH_TOKEN);
                localStorage.removeItem(Constants.USER_INFO);
                toast.success("Logged out successfully");
              }}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <User color="#333333" onClick={() => setView("login")} />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-red-[#086880]">
            <div className="flex justify-center">
              <Image
                src="/images/boichirtyo.png"
                alt="Logo"
                width={100}
                height={100}
              />
            </div>
            {/* {isLogin ? "Login" : "Create Account"} */}
          </DialogTitle>
          <DialogDescription className="text-center">
            <span className="text-lg">
              {isLogin
                ? "Login to your account"
                : "Enter your details to register"}
            </span>
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="space-y-4 mt-4">
              {/* ================= LOGIN ================= */}
              {isLogin ? (
                <>
                  {/* Email */}
                  <div>
                    <label>Email</label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-2.5 border rounded"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label>Password</label>
                    <div className="relative">
                      <Field
                        name="password"
                        type={showLoginPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full p-2.5 pr-10 border rounded"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-2 top-2"
                      >
                        {showLoginPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Remember */}
                  <label className="flex items-center gap-2">
                    <Field type="checkbox" name="remember" />
                    Remember me
                  </label>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={isLoginLoading}
                    className="w-full bg-[#006680] text-white py-3 rounded-lg disabled:opacity-50"
                  >
                    {isLoginLoading ? "অপেক্ষা করুন..." : "লগইন করুন"}
                  </button>

                  {/* Switch */}
                  <p className="text-center text-sm">
                    Don’t have an account?{" "}
                    <span
                      className="text-[#006680] cursor-pointer font-semibold"
                      onClick={() => setView("register")}
                    >
                      Sign up
                    </span>
                  </p>
                </>
              ) : (
                /* ================= REGISTER ================= */
                <>
                  {/* Name */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label>First Name</label>
                      <Field
                        name="firstName"
                        placeholder="First name"
                        className="w-full p-2.5 border rounded"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label>Last Name</label>
                      <Field
                        name="lastName"
                        placeholder="Last name"
                        className="w-full p-2.5 border rounded"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label>Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full p-2.5 border rounded"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label>Password</label>
                    <div className="relative">
                      <Field
                        name="password"
                        type={showRegisterPassword ? "text" : "password"}
                        className="w-full p-2.5 pr-10 border rounded"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowRegisterPassword(!showRegisterPassword)
                        }
                        className="absolute right-2 top-2"
                      >
                        {showRegisterPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label>Confirm Password</label>
                    <div className="relative">
                      <Field
                        name="confirmPassword"
                        type={showRegisterConfirmPassword ? "text" : "password"}
                        className="w-full p-2.5 pr-10 border rounded"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowRegisterConfirmPassword(
                            !showRegisterConfirmPassword,
                          )
                        }
                        className="absolute right-2 top-2"
                      >
                        {showRegisterConfirmPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                    {"confirmPassword" in values &&
                      values.confirmPassword &&
                      values.password !== values.confirmPassword ? (
                      <div className="text-red-500 text-sm">
                        Passwords must match
                      </div>
                    ) : (
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    )}
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={isRegisterLoading}
                    className="w-full bg-[#006680] text-white py-3 rounded-lg disabled:opacity-50"
                  >
                    {isRegisterLoading
                      ? "অপেক্ষা করুন..."
                      : "রেজিস্ট্রেশন করুন"}
                  </button>

                  {/* Switch */}
                  <p className="text-center text-sm">
                    Already have an account?{" "}
                    <span
                      className="text-[#006680] cursor-pointer font-semibold"
                      onClick={() => setView("login")}
                    >
                      Login
                    </span>
                  </p>
                </>
              )}
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
