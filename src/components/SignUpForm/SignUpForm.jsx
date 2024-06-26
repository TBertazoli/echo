import { useState, useEffect } from "react";
import { signUp } from "../../utilities/users-service";

import { useNavigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpForm({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  });
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    // delay .5sec to show loading spinner
    await new Promise((r) => setTimeout(r, 500));
    try {
      const { name, email, password } = formData;
      const user = await signUp({ name, email, password });
      setUser(user);
      setIsLoading(false);
      toast.info("Welcome!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        icon: false,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("We had a problem signing you up", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
        icon: false,
      });
    }
  }

  const disable = formData.password !== formData.confirm;

  return (
    <div className="h-screen flex items-center justify-center">
      <ToastContainer />
      <main className="font-sans h-full bg-zinc-950 flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="w-full mx-auto flex justify-center items-center h-full">
          <form
            className="relative  rounded-xl  bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline"
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ width: "500px" }}
          >
            <div className="grid h-full w-full overflow-hidden  p-6 py-8 sm:p-8 lg:p-12">
              <h3 className="mb-12 text-lg/7 font-semibold tracking-[-0.015em] text-gray-200 text-left">
                Sign up
              </h3>

              <div className="flex flex-col justify-start ">
                <label className="select-none text-left text-base/6 data-[disabled]:opacity-50 sm:text-sm/6 text-gray-200 mb-4">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-gray-200 border  border-white/10 data-[hover]:border-white/20  bg-white/5 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col justify-start ">
                <label className="select-none text-left text-base/6 data-[disabled]:opacity-50 sm:text-sm/6 text-gray-200 mb-4 mt-4">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-gray-200 border  border-white/10 data-[hover]:border-white/20  bg-white/5 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col justify-start ">
                <label className="select-none text-left text-base/6 data-[disabled]:opacity-50 sm:text-sm/6 text-gray-200 mb-4 mt-4">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-gray-200 border  border-white/10 data-[hover]:border-white/20  bg-white/5 focus:outline-none"
                  required
                />
              </div>
              <div className="flex flex-col justify-start ">
                <label className="select-none text-left text-base/6 data-[disabled]:opacity-50 sm:text-sm/6 text-gray-200 mb-4 mt-4">
                  Confirm
                </label>
                <input
                  type="password"
                  name="confirm"
                  value={formData.confirm}
                  onChange={handleChange}
                  className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-gray-200 border  border-white/10 data-[hover]:border-white/20  bg-white/5 focus:outline-none"
                  required
                />
              </div>
              {disable && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}
              <button
                className="text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-8 flex justify-center"
                type="submit"
                disabled={disable}
                style={{ backgroundColor: disable ? "#ccc" : null }}
              >
                {!isLoading ? (
                  "SIGN UP"
                ) : (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </button>

              <p
                data-slot="text"
                className="text-base/6 mt-8 text-left sm:text-sm/6 text-zinc-400"
              >
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="font-semibold text-zinc-950 hover:text-zinc-700 dark:text-gray-200 dark:hover:text-zinc-300 cursor-pointer"
                >
                  Sign in
                </span>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
