import { SampleController } from '@/controllers/sample.controller';
import { adminGuard, verifyToken } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class SampleRouter {
  private router: Router;
  private sampleController: SampleController;

  constructor() {
    this.sampleController = new SampleController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/',
      verifyToken,
      adminGuard,
      this.sampleController.getSample,
    );
    this.router.get('/:id', this.sampleController.getSampleById);
    this.router.post('/', this.sampleController.createSample);
  }

  getRouter(): Router {
    return this.router;
  }
}
