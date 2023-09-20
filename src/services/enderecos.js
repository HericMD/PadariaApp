import api from './api'

class EnderecoService {
  async getAllEnderecos() {
    const response = await api.get('/endereco/')
    return response.data
  }
  async saveEndereco(endereco) {
    const response = await api.post('/endereco/', endereco)
    return response.data
  }
  async deleteEndereco(endereco) {
    const response = await api.delete(`/endereco/${endereco.id}/`)
    return response.data
  }
  async updateEndereco(endereco) {
    const response = await api.put(`/endereco/${endereco.id}/`, endereco);
    return response.data
  }
}

export default new EnderecoService()