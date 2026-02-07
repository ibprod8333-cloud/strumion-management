// types/apartment.ts
export interface Apartment {
    id: string;
    name: string;
    buildingId: string;
    buildingName: string;
    floor: number;
    number: string;
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    pricePerNight: number;
    status: ApartmentStatus;
    amenities: string[];
    description: string;
}

export interface CreateApartmentDto {
    name: string;
    buildingId: string;
    floor: number;
    number: string;
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    pricePerNight: number;
    status: ApartmentStatus;
    amenities: string[];
    description: string;
}

export enum ApartmentStatus {
    AVAILABLE = "available",
    OCCUPIED = "occupied",
    MAINTENANCE = "maintenance",
}

export interface UpdateApartmentDto extends Partial<CreateApartmentDto> {}

export enum ApartmentAmenity {
    WIFI = "WiFi",
    TV = "TV",
    KITCHEN = "Kitchen",
    WASHING_MACHINE = "Washing Machine",
    AIR_CONDITIONING = "Air Conditioning",
    HEATING = "Heating",
    PARKING = "Parking",
    BALCONY = "Balcony",
    ELEVATOR = "Elevator",
    DISHWASHER = "Dishwasher",
}

export const COMMON_AMENITIES = Object.values(ApartmentAmenity);

// export const COMMON_AMENITIES = [
//     "WiFi",
//     "TV",
//     "Kitchen",
//     "Washing Machine",
//     "Air Conditioning",
//     "Heating",
//     "Parking",
//     "Balcony",
//     "Elevator",
//     "Dishwasher",
// ] as const;


export const APARTMENT_STATUS_LABELS: Record<ApartmentStatus, string> = {
    [ApartmentStatus.AVAILABLE]: "Available",
    [ApartmentStatus.OCCUPIED]: "Occupied",
    [ApartmentStatus.MAINTENANCE]: "Maintenance",
};

export const APARTMENT_STATUS_COLORS: Record<ApartmentStatus, string> = {
    [ApartmentStatus.AVAILABLE]: "bg-green-100 text-green-800",
    [ApartmentStatus.OCCUPIED]: "bg-blue-100 text-blue-800",
    [ApartmentStatus.MAINTENANCE]: "bg-red-100 text-red-800",
};