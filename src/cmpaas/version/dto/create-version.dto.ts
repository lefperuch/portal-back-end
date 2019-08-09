import { ApiModelProperty } from '@nestjs/swagger';

export class CreateVersionDto {
  @ApiModelProperty()
  readonly content: any;
  readonly created?: Date;
  readonly last_update?: Date;
  readonly link?: {
    readonly rel: string;
    readonly href: string;
  };
}