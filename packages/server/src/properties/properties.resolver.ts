import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PropertiesService } from './properties.service';
import { Property } from './property.model';

@Resolver('Properties')
export class PropertiesResolver {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Query(() => [Property])
  async properties(
    @Args('offset') offset: number = 0,
    @Args('limit') limit: number = 5,
  ) {
    return this.propertiesService.getProperties(offset, limit);
  }

  @Mutation(() => Property)
  async setExpired(@Args('id') id: string, @Args('expired') expired: boolean) {
    return this.propertiesService.setStatus(id, expired);
  }
}
