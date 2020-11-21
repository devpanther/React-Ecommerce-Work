import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { TO_LOGIN, TO_SIGNUP, TO_UNVERIFIED_EMAIL } from "../utils/constants";
import HomeIcon from "./shared/HomeIcon";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const NavBar = ({ darkMode, onClick }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const handleClick = (path) => {
    history.push(path);
    setOpen(false);
  };

  if ([TO_LOGIN, TO_SIGNUP, TO_UNVERIFIED_EMAIL].includes(location.pathname))
    return <HomeIcon />;

  for (let path of ["/verified-email", "/password-reset"])
    if (location.pathname.includes(path)) return <HomeIcon />;

  return (
    <>
      <TopBar onClick={onClick} darkMode={darkMode} setOpen={setOpen} />
      <SideBar onClick={handleClick} open={open} setOpen={setOpen} />
    </>
  );
};

export default NavBar;
