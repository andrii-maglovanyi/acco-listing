import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Property {
  @Field(() => ID)
  readonly id: string;
  @Field(() => [String])
  readonly images: string[];
  @Field()
  readonly bedrooms: number;
  @Field()
  readonly bathrooms: number;
  @Field()
  readonly address: string;
  @Field()
  readonly postcode: string;
  @Field()
  readonly description: string;
  @Field()
  readonly price: number;
  @Field()
  readonly expired: boolean;
}
