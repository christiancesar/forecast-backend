import ICreateTransporterDTO from '@modules/transporter/dtos/ICreateTransporterDTO';
import Transporter from '@modules/transporter/entities/Transporter';

export default interface ITransportersRepository {
  createTransporter(data: ICreateTransporterDTO): Promise<Transporter>;
}
