'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication
    router.push('/admin/dashboard');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-very-light-grey overflow-x-hidden">
      <div className="flex flex-1 justify-center items-stretch min-h-screen">
        <div className="grid grid-cols-12 w-full grow">
          {/* Left Panel */}
          <div className="col-span-12 md:col-span-6 flex flex-col justify-between p-8 lg:p-12 xl:p-16 bg-white">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-light-blue text-[32px]">
                  health_and_safety
                </span>
                <p className="text-dark-grey text-xl font-bold">MediSys</p>
              </div>
              <div className="w-full gap-1 overflow-hidden bg-white rounded-lg flex">
                <div
                  className="w-full bg-center bg-no-repeat bg-cover aspect-video rounded-xl"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCPyq624Pl4zgaS0orySIvMhLrSUOoUkPLUzhRXMMBRtLpM5LyE4u92iYxyUvx3Vzv21J9dyKyFRpoJEf_LC_hqDMtB1Vt0MfJYLKW3rgg_1eCaqen7hgFeSQ6IDrfqGJs5QW6fG4Sd-dutd1kxub2l3aDCAp3HLYTJzE-4WJxpFK5q_1d1FoWkCm1E30U-jfROXlBAbFm2m8OajRxyn9q2iFVfQcFlYjvI7-E0mf8nHoWRFKhwvHRI6I5QEvBFW6SrqPU2KRw9dmyX")',
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-dark-grey text-3xl font-bold leading-tight">
                  Streamlining Healthcare Management
                </p>
                <p className="text-medium-grey text-base font-normal leading-normal">
                  Welcome to the future of hospital operations, all in one secure platform.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-medium-grey text-sm font-normal">
                © 2024 MediSys. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-12 md:col-span-6 flex items-center justify-center p-8 lg:p-12 xl:p-16 bg-very-light-grey">
            <div className="flex flex-col max-w-[480px] w-full gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-dark-grey text-4xl font-black leading-tight tracking-[-0.033em]">
                  Sign In
                </p>
                <p className="text-medium-grey text-base font-normal leading-normal">
                  Sign in to access the Hospital Management System.
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-wrap items-end gap-4">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-dark-grey text-base font-medium leading-normal pb-2">
                      Email or Mobile Number
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-dark-grey focus:outline-0 focus:ring-0 border border-[#dbe6e2] bg-white focus:border-light-blue h-14 placeholder:text-medium-grey p-[15px] text-base font-normal leading-normal ring-2 ring-transparent focus:ring-light-blue/50 transition-shadow"
                      placeholder="Enter your email or mobile number"
                      type="text"
                      required
                    />
                  </label>
                </div>

                <div className="flex flex-wrap items-end gap-4">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-dark-grey text-base font-medium leading-normal pb-2">
                      Password
                    </p>
                    <div className="flex w-full flex-1 items-stretch rounded-lg group focus-within:border-light-blue focus-within:ring-2 focus-within:ring-light-blue/50 transition-shadow">
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-dark-grey focus:outline-0 focus:ring-0 border border-r-0 border-[#dbe6e2] bg-white h-14 placeholder:text-medium-grey p-[15px] pr-2 text-base font-normal leading-normal rounded-l-lg"
                        placeholder="Enter your password"
                        type={showPassword ? 'text' : 'password'}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-medium-grey flex border border-l-0 border-[#dbe6e2] bg-white items-center justify-center pr-[15px] rounded-r-lg cursor-pointer"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </label>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center font-bold text-white h-14 px-6 rounded-lg bg-light-blue hover:bg-opacity-90 transition-colors w-full"
                  >
                    <span className="text-base leading-normal">Log In</span>
                  </button>
                  <p className="text-light-blue text-sm font-normal leading-normal underline text-center cursor-pointer">
                    Forgot Password?
                  </p>
                </div>
              </form>

              <div className="flex items-center gap-2 pt-4">
                <hr className="w-full border-t border-[#dbe6e2]" />
                <p className="text-medium-grey text-sm whitespace-nowrap">Need help?</p>
                <hr className="w-full border-t border-[#dbe6e2]" />
              </div>
              <p className="text-medium-grey text-sm text-center">
                Contact our{' '}
                <a className="underline text-light-blue" href="#">
                  support team
                </a>{' '}
                for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

