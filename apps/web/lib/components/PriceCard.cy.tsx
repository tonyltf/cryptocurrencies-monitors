import PriceCard from "./PriceCard";

describe("PriceCard.cy.tsx", () => {
  it("should render and display expected content", () => {
    cy.mount(<PriceCard name='Bitcoin' pair='BTCUSD' />);
  });
});
