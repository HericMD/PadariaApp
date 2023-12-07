import api from './api'

class CarrinhoService {
  async getAllCarrinhos() {
    const response = await api.get('/carrinho/')
    return response.data
  }
  async saveCarrinho(carrinho) {
    const response = await api.post('/carrinho/', carrinho)
    return response.data
  }
  async deleteCarrinho(carrinho) {
    const response = await api.delete(`/carrinho/${carrinho.id}/`)
    return response.data
  }
  async putCarrinho(carrinho) {
    const response = await api.patch(`/carrinho/${carrinho.id}/`, carrinho);
    return response.data
  }
  async patchCarrinho(carrinho) {
    const response = await api.put(`/carrinho/${carrinho.id}/`, carrinho);
    return response.data
  }
}

export default new CarrinhoService()