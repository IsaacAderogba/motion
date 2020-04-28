declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string | undefined;
    PORT: number | undefined;
  }
}
