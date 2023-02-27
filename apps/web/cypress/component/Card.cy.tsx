import { Card } from "ui/Card";

describe("package/ui Card", () => {
  it("should render a Card component", () => {
    cy.mount(
      <Card
        key="BTCUSD"
        title="Bitcoin"
        subtitle="$25000"
        items={[
          {
            label: "Volume",
            value: "10000",
            color: "grey",
          },
          {
            label: "change",
            value: "100",
            color: "green",
          },
        ]}
      />
    );
  });
});
