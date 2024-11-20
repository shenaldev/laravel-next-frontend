import { Description } from "@radix-ui/react-dialog";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import NavLinks from "./nav-links";

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <MenuIcon size="1.3rem" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="hidden">
          <SheetTitle>Menu</SheetTitle>
          <Description>Navigation Menu</Description>
        </SheetHeader>
        <ul className="mt-8 flex flex-col items-center gap-6 text-lg font-semibold">
          <NavLinks />
        </ul>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
