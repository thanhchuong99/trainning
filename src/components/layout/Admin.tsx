import * as React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../conmon/NavBar";

export interface AdminLayoutProps {}

export function AdminLayout(props: AdminLayoutProps) {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  );
}
