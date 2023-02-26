import { useEffect, useState, Suspense } from "react";
import styled from 'styled-components'
import { Card } from "ui";
import PriceCard from "../lib/components/PriceCard";

const CardContiner = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function Web(props: any) {
  const { currencyList } = props;
  return (
    <div>
      <h1>Cryptocurrecny Realtime price</h1>
      <CardContiner>
        {Object.keys(currencyList).map(key => 
          <Suspense key={key} fallback={<p>Loading price...</p>}>
            <PriceCard name={key} pair={currencyList[key]} />
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