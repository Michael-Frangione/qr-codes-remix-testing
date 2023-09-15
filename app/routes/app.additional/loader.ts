import { LoaderArgs, json } from "@remix-run/node";
import { authenticate } from "../../shopify.server";
import { getProducts } from "../../models/QRCode.server";

export async function loader({ request }: LoaderArgs) {
  const { admin } = await authenticate.admin(request);

  const products = await getProducts(admin.graphql);

  return json({
    products,
  });
}
