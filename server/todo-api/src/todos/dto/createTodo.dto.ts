import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTodoDto {
    @ApiModelProperty()
    readonly _id: number;

    @ApiModelProperty()
    readonly text: string;

    @ApiModelProperty()
    readonly complete: boolean;
}