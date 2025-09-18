import { loginUser } from "../../src/services/authService";

const testCredentials = {
  username: "pruebasmisseguros@nacion-seguros.com.ar",
  password: "Prueba2025",
};

describe("Auth Service - loginUser Function", () => {
  test("should call loginUser function with test credentials", async () => {
    const response = await loginUser(testCredentials);

    console.log("loginUser response:", response);

    expect(response).toHaveProperty("usuario_oracle");
    expect(response).toHaveProperty("access_token");
    expect(response).toHaveProperty("refresh_token");
    expect(response).toHaveProperty("usuario_login");
  });
});
