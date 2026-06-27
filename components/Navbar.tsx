"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Headset, Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Removed unused dialog imports

import { AuthModal } from "@/components/custom/AuthModal";
import { SearchModal } from "@/components/custom/SearchModal";
import { DesktopSearch } from "@/components/custom/DesktopSearch";
import { CartDrawer } from "@/components/custom/CartDrawer";

import { TrackOrderModal } from "@/components/custom/TrackOrderModal";
import { LanguageSwitcher } from "@/components/custom/LanguageSwitcher";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const booksLinks: { title: string; href: string; description: string }[] = [
    {
      title: t("NAVBAR.ACADEMIC"),
      href: "/books/fiction",
      description: t("NAVBAR.DESC_1"),
    },
    {
      title: t("NAVBAR.POETRY"),
      href: "/books/non-fiction",
      description: t("NAVBAR.DESC_2"),
    },
    {
      title: t("NAVBAR.TRANSLATION"),
      href: "/books/childrens",
      description: t("NAVBAR.DESC_3"),
    },
    {
      title: t("NAVBAR.SCIENCE"),
      href: "/books/science",
      description: t("NAVBAR.DESC_4"),
    },
    {
      title: t("NAVBAR.ACADEMIC"),
      href: "/books/fiction",
      description: t("NAVBAR.DESC_1"),
    },
    {
      title: t("NAVBAR.POETRY"),
      href: "/books/non-fiction",
      description: t("NAVBAR.DESC_2"),
    },
    {
      title: t("NAVBAR.TRANSLATION"),
      href: "/books/childrens",
      description: t("NAVBAR.DESC_3"),
    },
    {
      title: t("NAVBAR.SCIENCE"),
      href: "/books/science",
      description: t("NAVBAR.DESC_4"),
    },
    {
      title: t("NAVBAR.ACADEMIC"),
      href: "/books/fiction",
      description: t("NAVBAR.DESC_1"),
    },
    {
      title: t("NAVBAR.POETRY"),
      href: "/books/non-fiction",
      description: t("NAVBAR.DESC_2"),
    },
    {
      title: t("NAVBAR.TRANSLATION"),
      href: "/books/childrens",
      description: t("NAVBAR.DESC_3"),
    },
    {
      title: t("NAVBAR.SCIENCE"),
      href: "/books/science",
      description: t("NAVBAR.DESC_4"),
    },
  ];

  return (
    <header className="sticky border-b border-gray-50 shadow-xs top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="bg-gray-100 hidden lg:block">
        <div className="container mx-auto px-4 flex h-8 items-center justify-between">
          <div className="flex text-sm text-gray-600 gap-2.5">
            <Headset color="#333333" />
            <span className="mt-1 text-sm text-[#333333] font-medium">
              {" "}
              {t("NAVBAR_TOP.HOTLINE")}{" "}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600 gap-3">
            <TrackOrderModal />
            {/* | <LanguageSwitcher /> */}
            {/* <span className="text-sm text-[#333333] font-medium cursor-pointer hover:text-[#006680]">
              {t("NAVBAR_TOP.BOOK_DONATION")}
            </span> */}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            {/* <span className="font-bold sm:inline-block text-4xl">
              বৈচিত্র্য
            </span> */}
            <Image
              src="/images/boichirtyo.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              {pathname !== "/" && (
                <NavigationMenuItem className="text-lg text-[#333333]">
                  <Link href="/" className={navigationMenuTriggerStyle()}>
                    {t("NAVBAR.HOME")}
                  </Link>
                </NavigationMenuItem>
              )}
              <NavigationMenuItem className="text-lg text-[#333333]">
                <NavigationMenuTrigger>{t("NAVBAR.CATEGORY")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[95vw] md:w-[700px] lg:w-[900px] xl:w-[1100px] gap-4 p-6 md:grid-cols-3 lg:grid-cols-4 bg-white mt-2">
                    {booksLinks.map((component, index) => (
                      <ListItem
                        key={`${component.title}-${index}`}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* <NavigationMenuItem className="text-lg text-[#333333]">
                <Link
                  href="/"
                  className={navigationMenuTriggerStyle()}
                >
                  {t("NAVBAR.BOOK")}
                </Link>
              </NavigationMenuItem> */}
              <NavigationMenuItem className="text-lg text-[#333333]">
                <Link href="/bestseller" className={navigationMenuTriggerStyle()}>
                  {t("NAVBAR.BEST_SELLER")}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="text-lg text-[#333333]">
                <Link href="/e-book" className={navigationMenuTriggerStyle()}>
                  {t("NAVBAR.E_BOOK")}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="text-lg text-[#333333]">
                <Link href="/authors" className={navigationMenuTriggerStyle()}>
                  {t("NAVBAR.AUTHOR")}
                </Link>
              </NavigationMenuItem>
              {/* <NavigationMenuItem className="text-lg text-[#333333]">
                <Link href="/contact" className={navigationMenuTriggerStyle()}>
                  {t("NAVBAR.BEAUTY_AND_PERSONAL_CARE")}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="text-lg text-[#333333]">
                <Link href="/contact" className={navigationMenuTriggerStyle()}>
                  {t("NAVBAR.HOME_APPLIANCES")}
                </Link>
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Actions: Cart & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 lg:gap-3.5">
          <div className="hidden md:block flex-1 mr-2">
            <DesktopSearch />
          </div>
          <div className="block md:hidden">
            <SearchModal />
          </div>

          <Link href={"/wishlist"}>
            <div className="relative hover:bg-transparent cursor-pointer">
              <Heart color="#333333" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-3 -right-3 flex h-5 w-5 items-center bg-red-500  text-white justify-center rounded-full text-[10px] font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </div>
          </Link>

          <CartDrawer />
          <AuthModal />
          {/* Mobile Menu Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" color="#006680" />
            ) : (
              <Menu color="#006680" className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              {pathname !== "/" && (
                <Link
                  href="/"
                  className="text-sm text-[#333333] font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("NAVBAR.HOME")}
                </Link>
              )}
              {/* <div className="space-y-3">
                <span className="text-sm font-medium text-muted-foreground">
                  বই
                </span>
                <div className="ml-4 flex flex-col space-y-2">
                  {booksLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div> */}
              <Link
                href="/about"
                className="text-sm text-[#333333] font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("NAVBAR.ACADEMIC")}
              </Link>
              <Link
                href="/publisher"
                className="text-sm text-[#333333] font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("NAVBAR.PUBLISHER")}
              </Link>
              <Link
                href="/contact"
                className="text-sm text-[#333333] font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("NAVBAR.INSTITUTIONAL")}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-md font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
