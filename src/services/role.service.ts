import { injectable } from 'tsyringe';
import { RoleRepository } from '../repositories/roleRepository';

@injectable()
export class RoleService {
    constructor(private roleRepository: RoleRepository) {}

    async getRole(): Promise<any> {
        return this.roleRepository.getRoles();
    }
}