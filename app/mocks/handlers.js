import { graphql } from "msw";

export const handlers = [
  graphql.query("GetProductsQuery", (req, res, ctx) => {
    return res(
      ctx.data({
        products: [
          {
            id: "gid://shopify/Product/8603901854017",
            title: "Orange Snowboard",
            handle: "orange-snowboard-1",
            resourcePublicationOnCurrentPublication: null,
          },
          {
            id: "gid://shopify/Product/8603901821249",
            title: "Yellow Snowboard",
            handle: "yellow-snowboard-1",
            resourcePublicationOnCurrentPublication: null,
          },
          {
            id: "gid://shopify/Product/8584382447937",
            title: "Orange Snowboard",
            handle: "orange-snowboard",
            resourcePublicationOnCurrentPublication: null,
          },
        ],
      })
    );
  }),
];
