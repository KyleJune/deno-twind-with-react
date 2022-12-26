import { Helmet } from "$esm/react-helmet-async";
import { Suspense } from "$esm/react";
import { Outlet, Link } from "$esm/react-router-dom";
import { cx } from "$esm/@twind/core";

const linkClass = cx(
  "transition-all duration-300 opacity-75 hover:(opacity-100 text-blue-500)",
);

export const Loading = () => (
  <div className="animate-pulse">
    <Helmet>
      <title>Loading...</title>
    </Helmet>
    <h1>Loading...</h1>
  </div>
);

export const Layout = () => (
  <>
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  </>
);

export function Index() {
  const links = [
    {
      href: "https://remix.run/tutorials/blog",
      text: "15m Quickstart Blog Tutorial",
    },
    {
      href: "https://remix.run/tutorials/jokes",
      text: "Deep Dive Jokes App Tutorial",
    },
    {
      href: "https://remix.run/docs",
      text: "Remix Docs",
    },
    {
      href: "https://twind.style/",
      text: "Twind Docs",
    },
  ];

  return (
    <main className="py-16 px-4 max-w-screen-md mx-auto w-full">
      <h1 className="text-4xl font-light mb-6">
        Welcome to Remix + Twind 💿🚀
      </h1>
      <ul className="list-disc grid gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={linkClass}
              target="_blank"
              rel="noreferrer"
            >
              {link.text}
            </a>
          </li>
        ))}
        <li>
          <Link to="/anything" className={linkClass}>
            Some other route
          </Link>
        </li>
      </ul>
    </main>
  );
}
