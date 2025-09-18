const axios = require("axios");

describe("Auth Service - Login Endpoint", () => {
  test("should call real login endpoint", async () => {
    const response = await axios.post(
      "https://capacitacion.nacion-seguros.com.ar:4445/mobile_pru/usuario/login",
      {
        username: "pruebasmisseguros@nacion-seguros.com.ar",
        password: "Prueba2025",
      }
    );

    console.log("Server response:", response.data);
    console.log("Status:", response.status);
    
    expect(response.status).toBe(200);
  });
});