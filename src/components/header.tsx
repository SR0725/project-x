import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          社群職業大解密
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  );
}
