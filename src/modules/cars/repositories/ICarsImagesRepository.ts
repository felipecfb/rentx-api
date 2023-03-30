import { CarsImage } from '../infra/entities/CarsImage';

interface ICarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarsImage>;
}

export { ICarsImagesRepository };
