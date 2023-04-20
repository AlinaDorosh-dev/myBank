/**
 * @fileoverview This file contains the Layout component which is used to display the header and footer in all pages
 * and to render the page content
 */

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const Layout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
