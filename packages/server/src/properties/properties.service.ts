import { Injectable } from '@nestjs/common';
import { Property } from './property.model';

import { properties } from '../../data/properties-listings.json';

@Injectable()
export class PropertiesService {
  async getProperties(offset: number, limit: number): Promise<Property[]> {
    return properties.slice(offset, offset + limit);
  }

  async setStatus(id: string, status: boolean): Promise<Property> {
    const property = properties.find(property => property.id === id);
    property.expired = status;

    return property;
  }
}
