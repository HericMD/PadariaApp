import api from './api'

class CategoriaService {
  async getAllCategorias() {
    const response = await api.get('/categoria/')
    return response.data
  }
  async saveCategoria(categoria) {
    const response = await api.post('/categoria/', categoria)
    return response.data
  }
  async deleteCategoria(categoria) {
    const response = await api.delete(`/categoria/${categoria.id}/`)
    return response.data
  }
}

export default new CategoriaService()