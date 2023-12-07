import api from "./api";
import LoginApi from "../services/login";

class UsuarioService {
  async updateUsuario(updatedUsuario) {
    const UserLogado = await LoginApi.UserLogado();
    const response = await api.put(
      `/usuarios/${UserLogado[0].id}/`,
      updatedUsuario
    );
    return response;
  }
}

export default new UsuarioService();
