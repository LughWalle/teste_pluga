import axios from 'axios';
import { fetchTools } from '../services/toolsService';

jest.mock('axios');

describe('toolsService', () => {
  it('Deve retornar os dados da API', async () => {
    const mockData = [{
      "app_id": "pagar_me",
      "name": "Pagar.me",
      "color": "#95C93F",
      "icon": "https://assets.pluga.co/apps/icons/pagar_me/pagar_me-icon.svg",
      "link": "https://pluga.co/ferramentas/pagar_me/integracao/"
      },
      {
      "app_id": "iugu",
      "name": "iugu",
      "color": "#000000",
      "icon": "https://assets.pluga.co/apps/icons/iugu/iugu-icon.svg",
      "link": "https://pluga.co/ferramentas/iugu/integracao/"
    }]
    axios.get.mockResolvedValue({ data: mockData });

    const data = await fetchTools()
    expect(axios.get).toHaveBeenCalledWith("https://pluga.co/ferramentas_search.json");
    expect(data).toEqual(mockData)
  })
  it('deve retornar erro ao buscar os dados e houver falha', async () => {
    axios.get.mockRejectedValue('Network Error')

    await expect(fetchTools()).rejects.toThrow('Network Error')
  })
})