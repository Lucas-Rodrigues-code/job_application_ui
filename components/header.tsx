"use client";
import {
  BarChart2,
  FileTextIcon,
  HomeIcon,
  LogOutIcon,
  UserCircle,
} from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";
import { useAuth } from "@/context/authContext";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const { logout } = useAuth();
  
  return (
    <header className="border-b bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold text-xl"
            >
              <BarChart2 className="h-6 w-6 text-primary" />
              <span className="font-bold">InsightJobs </span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/applications"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                <FileTextIcon className="h-4 w-4" />
                Candidaturas
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <UserCircle className="h-8 w-8 text-muted-foreground" />
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOutIcon className="h-5 w-5 text-muted-foreground" />
              <span className="sr-only">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
