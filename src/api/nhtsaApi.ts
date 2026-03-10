import type {
  DecodeVinResponse,
  VehicleVariablesResponse,
} from "../types/vehicle";

const BASE_URL = "https://vpic.nhtsa.dot.gov/api";

export const decodeVin = async (vin: string): Promise<DecodeVinResponse> => {
  const res = await fetch(`${BASE_URL}/vehicles/decodevin/${vin}?format=json`);

  if (!res.ok) {
    throw new Error("Failed to decode VIN");
  }

  return res.json();
};

export const getVariables = async (): Promise<VehicleVariablesResponse> => {
  const res = await fetch(
    `${BASE_URL}/vehicles/getvehiclevariablelist?format=json`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch vehicle variables");
  }

  return res.json();
};
