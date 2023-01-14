import { useEffect } from "react";

const { useState } = require("react");

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    const email = user?.email;
    const url = `https://gms-doctors-server.onrender.com/admin/${email}`;
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data);
        setAdminLoading(false)
      });
  }, [user]);
  return [admin, adminLoading];
};
export default useAdmin;
