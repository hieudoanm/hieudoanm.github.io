import { RESTDataSource } from '@apollo/datasource-rest';
import { BASE_URL } from '@mini/common/environments/environments';
import { Service } from './status.types';

export class StatusDataSource extends RESTDataSource {
  override baseURL = BASE_URL;

  async getStatus(service: Service): Promise<boolean> {
    const url = `/v1/status/${service}`;
    const { error } = await this.get<{ error: boolean }>(url);
    return error;
  }
}
