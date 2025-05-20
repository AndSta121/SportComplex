import { ApiProperty } from "@nestjs/swagger";

export class ViewSportDto {
    @ApiProperty({ example: 'a7f3c63b-2c9b-4f1e-9f9f-48fd8a6e9307', description: 'Sport ID' })
    id: string;
    
    @ApiProperty({ example: 'Football', description: 'Sport name' })
    name: string;
}