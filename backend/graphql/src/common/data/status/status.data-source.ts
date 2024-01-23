import { RESTDataSource } from '@apollo/datasource-rest';
import { BASE_API } from '../../environments/environments';
import { Service } from './status.types';

export class StatusDataSource extends RESTDataSource {
  override baseURL = BASE_API;

  async getStatus(service: Service): Promise<boolean> {
    const url = `/v1/status/${service}`;
    const { error } = await this.get<{ error: boolean }>(url);
    return error;
  }
}
