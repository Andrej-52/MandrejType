"use client";
import { Keyboard, Crown, User, Info } from "lucide-react";
import "./navbar.css";
import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="navbar">
        <div className="navbar-icons">
          <Link href="/" className="navbar-logo">
            MANDREJ
          </Link>
          <Link href="/"
            className="icon-bubble">
              <Keyboard size={30} />
          </Link>
             
          <Link href="/leaderboard" className="icon-bubble">
            <Crown size={30} />
          </Link>
          <Link href="/info" className="icon-bubble">
            <Info size={30} />
          </Link>
        </div>
      <div className="navbar-right">
        <Link href="/profile" className="icon-bubble">
          <User size={30} />
        </Link>
      </div>
    </nav>
  );
}