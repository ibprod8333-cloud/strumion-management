export interface Building {
    id?: string;
    name: string;
    address: string;
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
    createdAt?: Date;
    updatedAt?: Date;
    isConstruction: boolean;
}

export interface CreateBuildingDto {
    name: string;
    address: string;
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
    isConstruction?: boolean;
}

export interface UpdateBuildingDto {
    name?: string;
    address?: string;
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
}