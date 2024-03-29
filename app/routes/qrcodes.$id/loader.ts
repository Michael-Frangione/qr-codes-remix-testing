import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import db from "../../db.server";
import { getQRCodeImage } from "~/models/QRCode.server";

export const loader = async ({ params }) => {
  invariant(params.id, "Could not find QR code destination");

  const id = Number(params.id);
  const qrCode = await db.qRCode.findFirst({ where: { id } });

  invariant(qrCode, "Could not find QR code destination");

  return json({
    title: qrCode.title,
    image: await getQRCodeImage(id),
  });
};
