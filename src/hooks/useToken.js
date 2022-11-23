import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    const currentUser = {
      email: email,
      name: user?.user?.displayName,
      photo: user?.user?.photoURL,
    };
    if (email) {
      fetch(`http://localhost:5001/users/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          setToken(data.token);
          localStorage.setItem("accessToken", data.token);
        });
    }
  }, [user]);
  return token;
};
export default useToken;
