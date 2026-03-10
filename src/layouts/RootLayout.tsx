import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <NavLink
            to="/"
            className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-lime-400"
          >
            VIN Decoder
          </NavLink>

          <nav className="flex gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] transition ${
                  isActive
                    ? "bg-zinc-900 text-lime-400"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/variables"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] transition ${
                  isActive
                    ? "bg-zinc-900 text-lime-400"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                }`
              }
            >
              Variables
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Outlet />
      </main>

    </div>
  );
}