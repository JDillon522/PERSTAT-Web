import { AssignedTeam } from './team';

export interface User {
    bot_id: number;
    slack_id: string;
    name: string;
    perstat_required: boolean;
    included_in_report: boolean;
    team?: AssignedTeam;
}
