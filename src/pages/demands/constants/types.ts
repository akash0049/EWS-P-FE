type Status = "Active" | "Inactive";

export type Demand = {
    name: string;
    status: Status;
    description: string;
    market: string;
};