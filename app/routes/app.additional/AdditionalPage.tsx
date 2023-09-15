import { useLoaderData } from "@remix-run/react";
import { Box, Card, Layout, Page, Text, VerticalStack } from "@shopify/polaris";

export function AdditionalPage() {
  const { products } = useLoaderData();

  return (
    <Page>
      <ui-title-bar title="GraphQL Product Fetcher" />
      <Layout>
        <Layout.Section>
          <Card>
            <VerticalStack gap="3">
              <Text as="span" variant="bodyMd">
                {products.map((product) => (
                  <Box key={product.id}>
                    <Text as="span">{product.title}</Text>
                  </Box>
                ))}
              </Text>
            </VerticalStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
