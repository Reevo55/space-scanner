import axios from "axios";

interface BasicOptions {
  observerLat: string;
  observerLng: string;
  observerAlt: string;
}

export interface SkyServiceOptions extends BasicOptions {
  seconds: string | number;
}

export interface VisualPassesOptions extends BasicOptions {
  minVisibility: string | number;
  days: string | number;
}

export interface RadioPassesOptions extends BasicOptions {
  minElevetion: string | number;
  days: string | number;
}

export default class SkyService {
  constructor(
    private API_KEY: string | undefined = process.env.N2YO_API_KEY,
    private BASIC_URL: string | undefined = process.env.N2YO_BASIC_URL
  ) {}

  async getSatellitePositions(id: string, options: SkyServiceOptions) {
    return await axios.get(
      `${this.BASIC_URL}/positions/${id}/${options.observerLat}/${
        options.observerLng
      }/${options.observerAlt}/${options.seconds}${this.getKeyQuery()}`
    );
  }

  async getVisualPasses(id: string, options: VisualPassesOptions) {
    return await axios.get(
      `${this.BASIC_URL}/visualpasses/${id}/${options.observerLat}/${
        options.observerLng
      }/${options.observerAlt}/${options.days}/${
        options.minVisibility
      }${this.getKeyQuery()}`
    );
  }

  async getRadioPasses(id: string, options: RadioPassesOptions) {
    return await axios.get(
      `${this.BASIC_URL}/radiopasses/${id}/${options.observerLat}/${
        options.observerLng
      }/${options.observerAlt}/${options.days}/${
        options.minElevetion
      }${this.getKeyQuery()}`
    );
  }

  async getTle(id: string) {
    return await axios.get(`${this.BASIC_URL}/tle/${id}/${this.getKeyQuery()}`);
  }

  getKeyQuery() {
    return `&apiKey=${this.API_KEY}`;
  }
}
