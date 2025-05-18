import { plainToInstance } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, validateSync } from "class-validator";

class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  APP_PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_NAME: string;

  @IsNotEmpty()
  @IsBoolean()
  DB_LOGGING: boolean;

  @IsNotEmpty()
  @IsBoolean()
  DB_SYNCHRONIZATION: boolean;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}