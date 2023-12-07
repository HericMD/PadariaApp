import api from './api';

class LoginApi {

  async login(email, password) {
    try {
      const { data } = await api.post('/token/', {
        email,
        password,
      });

      this.email = email;

      return Promise.resolve({data});
    } catch (error) {
      return Promise.error(error);
    }
  }

  async UserLogado() {
    const response = await api.get(`/usuarios/?email=${this.email}`);
    return response.data;
  }

  async Cadastrar(novoUsuario){
    const response = await api.post('/usuarios/', novoUsuario);
    return response.data
  }

  async CriarCarrinho(carrinho){
    const UserLogado = await api.get(`/usuarios/?email=${this.email}`)
    
    const response = await api.put(`/usuarios/${UserLogado.data[0].id}/`, carrinho)
    return response.data
  }

}

export default new LoginApi();