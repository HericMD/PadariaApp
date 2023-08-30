<<<<<<< HEAD
import api from './api'

class ProdutoService {
  async getAllProdutos() {
    const response = await api.get('/produto/')
    return response.data
  }
  async saveProduto(produto) {
    const response = await api.post('/produto/', produto)
    return response.data
  }
  async deleteProduto(produto) {
    const response = await api.delete(`/produto/${produto.id}/`)
    return response.data
  }
}

=======
import api from './api'

class ProdutoService {
  async getAllProdutos() {
    const response = await api.get('/produto/')
    return response.data
  }
  async saveProduto(produto) {
    const response = await api.post('/produto/', produto)
    return response.data
  }
  async deleteProduto(produto) {
    const response = await api.delete(`/produto/${produto.id}/`)
    return response.data
  }
}

>>>>>>> 57229585dceb2c3675d0416321cd02fae493ae70
export default new ProdutoService()