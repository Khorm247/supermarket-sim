import axios from 'axios';

export default class MarketService {
    getAllMarkets() {
        return axios.get('/api/markets');
    }

    getMarketById(id: string) {
        return axios.get(`/api/products/${id}`);
    }

    addMarket(name: string) {
        return axios.post(`/api/markets`, name);
    }

    deleteMarketById(id: string) {
        return axios.delete(`/api/markets/${id}`);
    }
}