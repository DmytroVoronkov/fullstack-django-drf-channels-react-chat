import { Channel } from "./channel";

export interface Server {
    id: number;
    name: string;
    server: string
    description: string
    category: string;
    icon: string;
    channel_server: Channel[]
}