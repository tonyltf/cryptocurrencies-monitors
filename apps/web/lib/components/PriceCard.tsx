import { useEffect, useState } from 'react';
import { Card } from "ui/Card";
import { TPriceCard, getPrice } from "../ticker";

export default function PriceCard({ className, name, pair }: { className: string; name: string; pair: string; }) {
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
      height={100}
      width={250}
      key={pair}
      title={name || ''}
      subtitle={`$${priceInfo?.price || ''}`}
      items={[
        { label: 'Volume: ', value: priceInfo?.volume?.toString() || '-', color: 'grey' },
        { label: 'Change: ', value: priceInfo?.change?.toString() || '-', color: (priceInfo?.change || 0) < 0 ? 'red' : (priceInfo?.change || 0) > 0 ? 'green' : 'grey' },
      ]}
    />
  )
}
