import { AppVars, checkNeededEnvironmentVariables } from './app.envvars';
import { MissingEnvironmentVariables } from './exceptions';

describe('App Environment variables', () => {
  let oldVars: Map<string, string> = new Map();

  const test_secret = 'This_is_a_secret';

  beforeEach(() => {
    for (let envVar in AppVars) {
      oldVars[envVar] = process.env[envVar];
    }
  });

  afterEach(() => {
    for (let envVar in AppVars) {
      if (oldVars[envVar] === undefined) {
        //See node docs on process.env object --
        //implicit string casting when setting properties is deprecated.
        //So, I instead manually delete the property.
        delete process.env[envVar];
      } else {
        process.env[envVar] = oldVars[envVar];
      }
    }
  });

  it('Checks that all needed environment variables are present', () => {
    process.env[AppVars.TURNSTILE_SECRET] = test_secret;
    checkNeededEnvironmentVariables();
  });

  it('Throws informatively if an environment variable is missing', () => {
    expect(checkNeededEnvironmentVariables).toThrow(
      new MissingEnvironmentVariables([AppVars.TURNSTILE_SECRET]),
    );
  });
});
