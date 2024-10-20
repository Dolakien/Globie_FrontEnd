import { useQuery } from "@tanstack/react-query";
import { TOKEN_STORAGE_KEY } from "../constants";
import accountapi from "../api/accountApi";

const useProfile = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  const requestGetProfile = useQuery({
    queryKey: ["MY_PROFILE", token],
    queryFn: async () => {
      if (!token) {
        return Promise.resolve(null);
      }

      const r = await accountapi.getProfile();

      return r.data.data;
    },
  });

  return requestGetProfile;
};

export default useProfile;
