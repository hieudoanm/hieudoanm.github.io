import { RESTDataSource } from '@apollo/datasource-rest';
import { BASE_URL } from '@sunil/common/environments/environments';
import { Service } from './status.types';

export class StatusDataSource extends RESTDataSource {
  override baseURL = BASE_URL;

  async getStatus(service: Service): Promise<boolean> {
    const endpoint: string = `/api/status/${service}`;
    const { error } = await this.get<{ error: boolean }>(endpoint);
    return error;
  }
}
