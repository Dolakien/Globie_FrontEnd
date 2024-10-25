import React from "react";
import { USER_ROLE_STORAGE_KEY } from "../../constants";
import ProfileOverview from "./ProfileOverview/ProfileOverview";
import StoreOverview from "./StoreOverview/StoreOverview";

const Profile = () => {
  const role = localStorage.getItem(USER_ROLE_STORAGE_KEY);

  if (role === "STOREKEEPER") {
    return <StoreOverview />;
  }

  return <ProfileOverview />;
};

export default Profile;
