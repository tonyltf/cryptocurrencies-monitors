import { useEffect, useState, Suspense } from "react";
import styled from 'styled-components'
import { styles } from "ui";
import PriceCard from "../lib/components/PriceCard";
import "ui/global.css"

const CardContiner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
`;

export default function Web(props: any) {
  const { currencyList } = props;
  return (
    <div>
      <h1>Cryptocurrency Realtime price</h1>
      <CardContiner className={(styles as any).parent}>
        {Object.keys(currencyList).map(key => 
          <Suspense key={key} fallback={<p>Loading price...</p>}>
            <PriceCard name={key} pair={currencyList[key]} className={(styles as any).child} />
          </Suspense>
        )}
      </CardContiner>
    </div>
  );
}
export async function getServerSideProps () {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const res = await fetch(`${process.env.SERVER_API_PATH}/list`);
  const currencyList = await res.json();
  return { props: { currencyList }};
}