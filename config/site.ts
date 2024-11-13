export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Test Mate",
  description: "Here you can create a test or a survey and share it with others. It is free, innovative and easy to use!",
  navItems: [
    {
      label: "Tests",
      href: "/dashboard/tests",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Tests",
      href: "/dashboard/tests",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],

};
