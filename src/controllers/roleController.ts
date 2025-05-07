import { injectable } from "tsyringe";
import { RoleService } from "../services/role.service";

@injectable()
export class RoleController {
    constructor(private roleService: RoleService) {}

    async getActionById(req: Request, res: Response): Promise<void> {
        try {
            const action = await this.roleService.getRole();
            if (action) {
                res.json();
            } else {
                res.json();
            }
        } catch (error: any) {
            res.json();
        }
    }
}