import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingEnvironmentVariables extends Error {
  constructor(missing_variables: string[]) {
    super(
      `Error! Not all environment variables required for the app are present! Missing Variables: ${missing_variables}`,
    );
  }
}
