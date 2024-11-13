'use client';

import { link as linkStyles } from "@nextui-org/react";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { LogoutIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import { 
  Dropdown, 
  DropdownItem,
  DropdownMenu, 
  DropdownTrigger, 
  Link, 
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  User, 
  Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { title } from "./primitives";

// Define user type for TypeScript
interface UserData {
  username: string;
  firstname: string;
  surname: string;
  image: string;
  email: string;
  timeStamp: Date;
  tests: string[];
}

export const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null); // Initialize with null

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Moved here for clarity
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser) as UserData);
      } else {
        if (token) {
          try {
            const response = await fetch('http://localhost:3040/dashboard/nav', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }), // Wrap token in an object for correct body format
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Something went wrong');
            setUser(data.creator); // Assume data.creator contains the user info
            localStorage.setItem('user', JSON.stringify(data.creator));
            localStorage.setItem('tests', JSON.stringify(data.tests));
          } catch (error) {
            console.error("Failed to fetch user data:", error);
          }
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    localStorage.removeItem('user'); // Clear saved user data
    localStorage.removeItem('tests'); // Clear saved user data
    setUser(null); // Clear state
    router.push("/"); // Redirect to sign-in page after logout
  };

  return (
    <NextUINavbar className=" md:h-full md:flex md:flex-col md:justify-start bg-blue-600" position="sticky">
      {/* Brand and Logo */}
      <NavbarContent className="basis-1/5 sm:basis-full md:flex md:flex-col md:items-start">
        <div className="flex flex-row ">
          <NavbarBrand as="li" className=" w-44 mt-5">
            <img src="/logo.png" alt="logo" height={40} width={40} /> <p className='text-blue-200'>TEST </p> <p className='text-yellow-400'>MATE</p>
          </NavbarBrand>
          <ThemeSwitch className="ml-5" />
        </div>
        <Divider className="w-full" />

        {/* User Dropdown */}
        {user && (
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: user.image,
                  alt: user.firstname,
                }}
                className="transition-transform"
                description={`@${user.username}`}
                name={`${user.firstname} ${user.surname}`}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p>Signed in as</p>
                <p>@{user.username}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        {/* Navigation Links */}
        <Divider className="w-full" />
        <ul className="hidden lg:flex flex-col gap-4 justify-start mt-4 ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="mt-auto w-full">
          <Divider className="mt-auto w-full" />
          <button onClick={handleLogout} className="mt-3 flex items-center space-x-2 hover:text-gray-100">
            <LogoutIcon size={24} />
            <span>Logout</span>
          </button>
        </div>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex md:flex-col md:items-start basis-1/5 sm:basis-full" justify="end" />

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? "primary" :
                  index === siteConfig.navMenuItems.length - 1 ? "danger" : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
