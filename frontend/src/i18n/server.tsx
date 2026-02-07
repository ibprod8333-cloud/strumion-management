import { env } from "@/env.mjs";

export const getLocale = async () => env.NEXT_PUBLIC_LANGUAGE;

