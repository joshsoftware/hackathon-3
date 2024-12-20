import { axiosBasic } from "utils/axios/axios";

export const login = async (email: string, password: string)  => {
  const body = {
    email: email,
    password: password,
  };

  type response = {
    token: string;
  };

  return axiosBasic.post<response>("/login", body);
};
