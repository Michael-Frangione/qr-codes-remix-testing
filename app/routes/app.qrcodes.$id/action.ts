import { json, redirect } from "@remix-run/node";
import { authenticate } from "../../shopify.server";

import db from "../../db.server";
import { validateQRCode } from "../../models/QRCode.server";

export async function action({ request, params }) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  const formData = await request.formData();

  /** @type {any} */
  const data = {
    ...Object.fromEntries(formData),
    shop,
  };

  if (data.action === "delete") {
    if (params.id) {
      await db.qRCode.delete({ where: { id: Number(params.id) } });
    }
    return redirect("/app");
  }

  const errors = validateQRCode(data);

  if (errors) {
    return json({ errors }, { status: 422 });
  }

  const qrCode =
    params.id === "new"
      ? await db.qRCode.create({ data })
      : await db.qRCode.update({ where: { id: Number(params.id) }, data });

  return redirect(`/app/qrcodes/${qrCode.id}`);
}
