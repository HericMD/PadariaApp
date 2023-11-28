import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UsuarioService {
  async getAllUsuarios() {
    const response = await api.get('/usuarios/');
    return response.data;
  }

  async login(email, password) {
    const response = await api.post('/token', { email, password });
    console.log(response.data);
    if (response.data && response.data?.user && response.data?.user?.id) {
      await AsyncStorage.setItem('accessToken', response.data.access);
      await AsyncStorage.setItem('userId', String(response.data.user.id));
    }
    return response.data;
  }

  async logout() {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userId');
  }

  async getUsuarioInfo() {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await api.get('/usuarios/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  }

  async getUserById(id) {
    const response = await api.get(`/usuarios/${id}`);
    console.log('User data:', response.data);
    return response.data;
  }
}

export default new UsuarioService();