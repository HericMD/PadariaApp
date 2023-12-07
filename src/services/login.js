import api from './api';

class LoginApi {
  // constructor() {
  //   this.email = '';
  // }

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

  async logout() {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userId');
  }

}

export default new LoginApi();