import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";

export default function Nav() {
  const user = useUser();

  const display = user ? (
    <>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
    </>
  ) : (
    <Link href="/signin">Sign In</Link>
  );
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {display}
    </NavStyles>
  );
}
