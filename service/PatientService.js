import http from "../http-common";

export default class PatientService {
  constructor() {
    this.url = "/patient";
  }

  async getAll() {
    try {
      const response = await http.get(`${this.url}/mobile`);
      return response.data;
    } catch (e) {
      throw e.response?.data || e;
    }
  }
}
