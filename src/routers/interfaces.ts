import { Router } from 'express';

export interface RouterImpl {
  (): {
    prefix: string;
    router: Router;
  };
}
