"use client";

import React, { useEffect, useState } from "react";
import ProfileCard from "../../../../pages/ProfileCard";
import Link from "next/link";
import "./login_area.css";

export default function LoginArea() {
  return (
    <main>
      <nav className="navbar navbar-expand-lg navbar-loginArea">
        <div className="container-md">
          <Link className="navbar-brand navbar-link" href="/Register">
            Registrar seu Pet
          </Link>
        </div>
      </nav>
      <section className="containerLoginArea">
        <ProfileCard />
      </section>
    </main>
  );
}
