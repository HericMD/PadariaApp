import api from './api'

class ItemService {
  async getAllItens() {
    const response = await api.get('/item/')
    return response.data
  }
  async saveItem(item) {
    const response = await api.post('/item/', item)
    return response.data;
  }
  async deleteItem(item) {
    const response = await api.delete(`/item/${item.id}/`)
    return response.data
  }
  async updateItem(item) {
    const response = await api.patch(`/item/${item.id}/`, item);
    return response.data
  }
}

export default new ItemService()