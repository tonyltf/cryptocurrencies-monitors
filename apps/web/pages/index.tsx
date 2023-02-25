import { useEffect, useState } from "react";
import { Card } from "ui";
import { CurrencyCard, getPrice } from "../lib/ticker";

export default function Web(props: any) {
  const { currencyList } = props;
  const [currencyCards, setCurrencyCards] = useState<CurrencyCard[]>([]);
  useEffect(() => {
    const fetchByCurrencyList = async () => {
      const cards = await Promise.all(Object.keys(currencyList).map(async (key: string) => {
        const priceInfo = await getPrice(currencyList[key]);
        return {
          name: key,
          pair: currencyList[key],
          ...priceInfo,
        }
      }));
      setCurrencyCards(cards);
    };
    fetchByCurrencyList();
  }, [currencyList]);

  return (
    <div>
      <h1>Cryptocurrecny Realtime price</h1>
      {currencyCards.map(({ name, pair, price, volume, change }: { name: string; pair: string; price?: number; volume?: number; change?: number; }) => {
        return <Card
          key={pair}
          title={name}
          subtitle={`$${price}`}
          content={<>Volume: {volume || '-'}<br/>Change: {change || '-'}</>}
          />
      })}
    </div>
  );
}
export async function getServerSideProps () {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const res = await fetch(`${process.env.API_PATH}/list`);
  const currencyList = await res.json();
  return { props: { currencyList }};
}