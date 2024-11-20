import Link from "next/link";

function NavLinks() {
  return (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/services">Services</NavLink>
      <NavLink href="/portfolio">Portfolio</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </>
  );
}

export default NavLinks;

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  scroll?: boolean;
};

const NavLink = ({ href, children, scroll = false }: NavLinkProps) => {
  return (
    <li role="none">
      <Link
        href={href}
        className="hover:text-primary"
        role="menuitem"
        scroll={scroll}
      >
        {children}
      </Link>
    </li>
  );
};
