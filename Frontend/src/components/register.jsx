import { useState } from "react";
import { Link } from "react-router-dom";
import travel from "@/assets/vp-daman.jpg";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f1e7] p-4 md:p-5 flex items-center justify-center">

      {/* Main Container */}
      <div className="relative w-full max-w-[1500px] min-h-[720px] overflow-hidden rounded-[28px] bg-white shadow-xl">

        {/* ================= LEFT SIDE ================= */}
        <div
          className="absolute inset-0 hidden bg-cover bg-center lg:block"
          style={{
            backgroundImage: `url(${travel})`,
          }}
        >

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />

          {/* Logo */}
          <div className="absolute left-11 top-9 flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ed8508]">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-white"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="8.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M15.5 8.5L13.5 13.5L8.5 15.5L10.5 10.5L15.5 8.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>

            </div>

            <span className="font-serif text-2xl font-bold text-white">
              Wanderlens
            </span>

          </div>


          {/* Welcome Text */}
          <div className="absolute left-11 top-[35%] max-w-[470px]">

            <h1 className="font-serif text-[58px] font-bold leading-[0.98] tracking-[-2px] text-[#2c1a12]">

              Your next
              <br />

              <span className="italic text-[#ed8508]">
                adventure.
              </span>

            </h1>

            <p className="mt-6 max-w-[410px] text-xl leading-8 text-[#493b35]">
              Create your account and start
              <br />
              discovering places worth traveling for.
            </p>

          </div>


          {/* Quote */}
          <div className="absolute bottom-8 left-11 max-w-[365px] rounded-2xl border border-white/20 bg-black/50 px-7 py-5 backdrop-blur-md">

            <div className="flex gap-4">

              <span className="font-serif text-4xl leading-6 text-white">
                “
              </span>

              <div>

                <p className="text-sm leading-6 text-white">
                  Life is either a daring adventure
                  or nothing at all.
                </p>

                <p className="mt-2 text-sm font-medium text-[#ed8508]">
                  — Helen Keller
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="relative ml-auto flex min-h-[720px] w-full items-center justify-center bg-[#fcfaf6] px-6 py-10 lg:w-[51%] lg:rounded-l-[32px]">

          <div className="w-full max-w-[455px]">

            {/* Mobile Logo */}
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ed8508]">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-white"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M15.5 8.5L13.5 13.5L8.5 15.5L10.5 10.5L15.5 8.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

              <span className="font-serif text-2xl font-bold text-[#2c1a12]">
                Wanderlens
              </span>

            </div>


            {/* Heading */}
            <div className="text-center">

              <h2 className="font-serif text-4xl font-bold tracking-[-1px] text-[#2c1a12]">
                Create your account
              </h2>

              <p className="mt-3 text-[15px] text-[#756b65]">
                Join Wanderlens and start exploring
              </p>

            </div>


            {/* Form */}
            <form className="mt-8 space-y-4">

              {/* Name */}
              <div>

                <label className="mb-2 block text-sm font-medium text-[#33251e]">
                  Full Name
                </label>

                <div className="relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#716861]">

                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="8"
                        r="3.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                      <path
                        d="M5 20C5.5 16.5 8 14.5 12 14.5C16 14.5 18.5 16.5 19 20"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>

                  </div>

                  <input
                    type="text"
                    placeholder="Your full name"
                    className="h-[54px] w-full rounded-xl border border-[#ddd7d0] bg-[#fffdfa] pl-14 pr-4 text-[15px] text-[#2c1a12] outline-none transition placeholder:text-[#9a918a] focus:border-[#ed8508] focus:ring-2 focus:ring-[#ed8508]/10"
                  />

                </div>

              </div>


              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-medium text-[#33251e]">
                  Email Address
                </label>

                <div className="relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#716861]">

                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                      <path
                        d="M4 7L12 13L20 7"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                    </svg>

                  </div>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="h-[54px] w-full rounded-xl border border-[#ddd7d0] bg-[#fffdfa] pl-14 pr-4 text-[15px] text-[#2c1a12] outline-none transition placeholder:text-[#9a918a] focus:border-[#ed8508] focus:ring-2 focus:ring-[#ed8508]/10"
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <label className="mb-2 block text-sm font-medium text-[#33251e]">
                  Password
                </label>

                <div className="relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#716861]">

                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect
                        x="5"
                        y="10"
                        width="14"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                      <path
                        d="M8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                    </svg>

                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="h-[54px] w-full rounded-xl border border-[#ddd7d0] bg-[#fffdfa] pl-14 pr-14 text-[15px] text-[#2c1a12] outline-none transition placeholder:text-[#9a918a] focus:border-[#ed8508] focus:ring-2 focus:ring-[#ed8508]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#817871] hover:text-[#33251e]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>


              {/* Confirm Password */}
              <div>

                <label className="mb-2 block text-sm font-medium text-[#33251e]">
                  Confirm Password
                </label>

                <div className="relative">

                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#716861]">

                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect
                        x="5"
                        y="10"
                        width="14"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                      <path
                        d="M8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />

                    </svg>

                  </div>

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    className="h-[54px] w-full rounded-xl border border-[#ddd7d0] bg-[#fffdfa] pl-14 pr-14 text-[15px] text-[#2c1a12] outline-none transition placeholder:text-[#9a918a] focus:border-[#ed8508] focus:ring-2 focus:ring-[#ed8508]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#817871] hover:text-[#33251e]"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>


              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">

                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 cursor-pointer accent-[#ed8508]"
                />

                <p className="text-xs leading-5 text-[#756b65]">

                  I agree to the{" "}
                  <button
                    type="button"
                    className="font-medium text-[#df6d00] hover:underline"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="font-medium text-[#df6d00] hover:underline"
                  >
                    Privacy Policy
                  </button>

                </p>

              </div>


              {/* Create Account */}
              <button
                type="submit"
                className="mt-1 h-[56px] w-full rounded-full bg-gradient-to-r from-[#df6900] to-[#f18a00] text-base font-semibold text-white shadow-md shadow-orange-500/20 transition duration-200 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-orange-500/25 active:translate-y-0"
              >
                Create Account
              </button>


              {/* Divider */}
              <div className="flex items-center gap-4 py-1">

                <div className="h-px flex-1 bg-[#ded8d1]" />

                <span className="text-sm text-[#817871]">
                  or continue with
                </span>

                <div className="h-px flex-1 bg-[#ded8d1]" />

              </div>


              {/* Google */}
              <button
                type="button"
                className="flex h-[50px] w-full items-center justify-center gap-3 rounded-xl border border-[#ddd7d0] bg-white text-[15px] font-medium text-[#403630] transition hover:bg-[#f8f5f0]"
              >

                <span className="text-lg font-bold text-[#4285F4]">
                  G
                </span>

                Continue with Google

              </button>


              {/* Apple */}
              <button
                type="button"
                className="flex h-[50px] w-full items-center justify-center gap-3 rounded-xl border border-[#ddd7d0] bg-white text-[15px] font-medium text-[#403630] transition hover:bg-[#f8f5f0]"
              >

                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25C11.88 5.02 13.69 3.18 15.79 3c.29 2.58-2.34 4.5-3.76 4.25z" />
                </svg>

                Continue with Apple

              </button>

            </form>


            {/* Login */}
            <p className="mt-7 text-center text-sm text-[#756b65]">

              Already have an account?

              <button
                type="button"
                className="ml-1 font-medium text-[#df6d00] hover:underline"
              >
                <Link to="/login">Log in</Link>
              </button>

            </p>

          </div>

        </div>

      </div>
    </div>
  );
}