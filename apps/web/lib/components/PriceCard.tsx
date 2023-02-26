import { useEffect, useState } from 'react';
import { Card } from "ui/Card";
import { TPriceCard, getPrice } from "../ticker";

export default function PriceCard({ name, pair }: { name: string; pair: string; }) {
  const [priceInfo, setPriceInfo] = useState<TPriceCard>({ name, pair });
  useEffect(() => {
    const fetchCurrencyPrice = async () => {
      const priceInfo = await getPrice(pair);
      setPriceInfo({
        name,
        pair,
        ...priceInfo,
      });
    }
    fetchCurrencyPrice();
  }, [name, pair]);

  return (
    <Card
      key={pair}
      title={name || ''}
      subtitle={`$${priceInfo?.price || ''}`}
      items={[
        { label: 'Volume: ', value: priceInfo?.volume?.toString() || '-' },
        { label: 'Change: ', value: priceInfo?.change?.toString() || '-' },
      ]}
    />
  )
}
