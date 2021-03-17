import API from "./axioshelper";

class AuthService {
  constructor() {
    this.permissions = null;
  }

  setAxiosInterceptors = ({ onLogout }) => {
    API.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          this.setSession(null);
          if (onLogout) {
            onLogout();
          }
        }
        return Promise.reject(error);
      }
    );
  };

  loginWithEmailAndPassword = (username, password) =>
    new Promise((resolve, reject) => {
      API.post("/login", {
        username,
        password,
      })
        .then((response) => {
          console.log("THEN");
          if (response.data.username) {
            localStorage.setItem("username", username);
            localStorage.setItem("role", response.data.role);
            this.setSession(response.data.token);
            resolve(response.data.username);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });

  logout = () => {
    this.setSession(null);
  };

  setSession = (accessToken) => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      API.defaults.headers.common.Authorization = `Basic ${accessToken}`;
      API.defaults.headers.common.schema = true;
    } else {
      localStorage.removeItem("accessToken");
      delete API.defaults.headers.common.Authorization;
      delete API.defaults.headers.common.schema;
    }
  };

  getAccessToken = () => localStorage.getItem("accessToken");

  isAuthenticated = () => !!this.getAccessToken();
}

const authService = new AuthService();

export default authService;
