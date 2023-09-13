import { installGlobals } from "@remix-run/node";
import "@testing-library/jest-dom/vitest";

process.env.SCOPES = "write_products";
process.env.SHOPIFY_APP_URL = "http://localhost:3000";
process.env.SHOPIFY_API_KEY = "12345";
process.env.SHOPIFY_API_SECRET = "12345";

installGlobals();
