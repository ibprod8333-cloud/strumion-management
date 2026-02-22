export interface Building {
    id?: string;           // Firestore document ID
    name: string;          // Building name
    address: string;       // Street address
    city: string;
    country: string;
    latitude?: number;     // Optional geolocation
    longitude?: number;    // Optional geolocation
    createdAt?: Date;      // Timestamp
    updatedAt?: Date;      // Timestamp
    isConstruction?: boolean;
}