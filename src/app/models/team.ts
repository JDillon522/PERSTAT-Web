export interface AssignedTeam {
    team_id: number;
    team_name: string;
    role: Role;
}

export type Role = 'lead'|'member';
