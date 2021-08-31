import axios from "axios";

export const getToken = async ({ email, password }) => {

  try {
    const url = 'http://challenge-react.alkemy.org';
    const { data: { token } } = await axios.post(url, {
      email,
      password
    });
    return token;
  } catch (error) {
    return error
  }
}
