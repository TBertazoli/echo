import { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";

export default function LoginForm({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (user) {
      navigate("/");
    }
  }, [navigate]);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const springs = useSpring({
    from: { opacity: 0, backgroundColor: "#fff", borderColor: "#fff" },
    to: {
      opacity: error ? 1 : 0,
      backgroundColor: error ? "#fed7d7" : "#fff",
      borderColor: error ? "#e53e3e" : "#fff",
    },
    config: { duration: 200 },
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    // delay .5sec to show loading spinner
    await new Promise((r) => setTimeout(r, 500));
    try {
      const user = await usersService.login(credentials);
      setUser(user);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setError("Log In Failed - Incorrect Email or Password");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <main className="font-sans h-full bg-zinc-950 flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="w-full mx-auto flex justify-center items-center h-full">
          <form
            className="relative rounded-xl  bg-zinc-900 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline"
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ width: "500px" }}
          >
            <div className="grid h-full w-full overflow-hidden  p-6 py-8 sm:p-8 lg:p-12">
              <h3 className="text-lg/7 font-semibold tracking-[-0.015em] text-white text-left mb-4">
                Sign in
              </h3>

              <animated.div
                className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
                style={springs}
              >
                {error && (
                  <>
                    <svg
                      className="flex-shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">{error}</span>
                    </div>{" "}
                  </>
                )}
              </animated.div>

              <div className="flex flex-col justify-start ">
                <label className="select-none text-left text-base/6 data-[disabled]:opacity-50 sm:text-sm/6 text-white mb-4">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border  border-white/10 data-[hover]:border-white/20  bg-white/5 focus:outline-none"
                  required
                />
              </div>
              <label className="select-none text-left text-base/6 data-[disabled]:opacity-50 sm:text-sm/6 text-white mb-4 mt-4">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 placeholder:text-zinc-500 sm:text-sm/6 text-white border  border-white/10 data-[hover]:border-white/20  bg-white/5 focus:outline-none"
              />
              <button
                className="mt-8 w-full relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[disabled]:opacity-50 [&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent bg-[--btn-border] dark:bg-[--btn-bg] before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg] before:shadow dark:before:hidden dark:border-white/5 after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay] dark:after:-inset-px dark:after:rounded-lg before:data-[disabled]:shadow-none after:data-[disabled]:shadow-none text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)] dark:text-white dark:[--btn-bg:theme(colors.zinc.600)] dark:[--btn-hover-overlay:theme(colors.white/5%)] [--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)] cursor-pointer"
                type="submit"
              >
                {!isLoading ? (
                  "LOGIN"
                ) : (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                className="text-base/6 mt-8 text-left text-zinc-500 sm:text-sm/6 dark:text-zinc-400"
              >
                Don’t have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="font-semibold text-zinc-950 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300 cursor-pointer"
                >
                  Sign up
                </span>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
