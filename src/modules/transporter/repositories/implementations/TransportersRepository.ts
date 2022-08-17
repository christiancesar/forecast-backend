import ICreateTransporterDTO from '@modules/transporter/dtos/ICreateTransporterDTO';
import Transporter from '@modules/transporter/entities/Transporter';
import { getRepository, Repository } from 'typeorm';
import ITransporterRepository from '../interfaces/ITransportersRepository';

export default class TransportersRepository implements ITransporterRepository {
  private ormRepository: Repository<Transporter>;

  constructor() {
    this.ormRepository = getRepository(Transporter);
  }

  async createTransporter(data: ICreateTransporterDTO): Promise<Transporter> {
    const transporter = this.ormRepository.create(data);
    await this.ormRepository.save(transporter);
    return transporter;
  }
}
