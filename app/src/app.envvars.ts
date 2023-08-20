import { MissingEnvironmentVariables } from './exceptions';

export enum AppVars {
  TURNSTILE_SECRET = 'TURNSTILE_SECRET',
}

export function checkNeededEnvironmentVariables(): void {
  let missingEnvVars: string[] = [];
  for (let envVar in AppVars) {
    if (!process.env[envVar]) {
      missingEnvVars.push(envVar);
    }
  }
  if (missingEnvVars.length > 0) {
    throw new MissingEnvironmentVariables(missingEnvVars);
  }
}
