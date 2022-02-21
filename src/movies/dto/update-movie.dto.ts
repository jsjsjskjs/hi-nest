import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator"
import { CreateMovieDto } from "./create-movie.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

/*
export class UpdateMovieDto {
  @IsString()
  readonly title?: string //물음표는 필수사항이 아니라는 뜻
  @IsNumber()
  readonly year?: number
  @IsString({each: true})
  readonly genres?: string[]
}
*/