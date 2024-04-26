import React, { useEffect, useState } from "react";
import Logout from "../Pages/Logout";
import { useAuth } from "../context/AuthProvider";

function Profile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authUser] = useAuth();
  const [initials, setInitials] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (authUser && authUser.fullname) {
      const nameArray = authUser.fullname.split(" ");
      const firstInitial = nameArray[0][0];
      const lastInitial = nameArray[nameArray.length - 1][0];
      setInitials(`${firstInitial}${lastInitial}`);
    }
  }, [authUser]);

  return (
    <div className="relative dark:bg-slate-800 dark:text-white">
      <button
        className="btn btn-circle btn-outline dark:text-white"
        onClick={toggleDropdown}
        aria-expanded={dropdownOpen}
      >
        <div className="avatar placeholder">
          <div className="bg-neutraltext-neutral-content rounded-full w-12">
            {authUser.fullname ? <span>{initials}</span> : <span>hi</span>}
          </div>
        </div>
      </button>
      {dropdownOpen && (
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 absolute top-full right-0 dark:bg-slate-900 dark:text-white">
          <li>
            <a href="/profile">View Profile</a>
          </li>
          <li>
            <a>
              <Logout />
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Profile;
