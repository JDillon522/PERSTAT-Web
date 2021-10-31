import { AssignedTeam } from './team';

export interface User {
    bot_id: number;
    included_in_report: boolean;
    name: string;
    perstat_required: boolean;
    role: string;
    slack_id: string;
    team_name: string;
}
