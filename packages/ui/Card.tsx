import * as React from "react";
import styled from 'styled-components'

const CardWrapper = styled.div`
  border: 1px solid #AAA;
  padding: 1em;
  margin: 1em;
`;

const CardTitle = styled.div`
`;

const CardSubtitle = styled.div`
  color: orange;
`;

const ItemContainer = styled.div`
  display: flex;
`;

const ItemWrapper = styled.div`
`;

const ItemLabel = styled.div`
`;

const ItemValue= styled.div`
`;

export const Card = ({ title, subtitle, items }: { title: string; subtitle: string; items: { label: string; value: string;}[] }) => {
  return <CardWrapper>
    <CardTitle>{title}</CardTitle>
    <CardSubtitle>{subtitle}</CardSubtitle>
    <ItemContainer>
      {items?.map(({ label, value }) => {
        return <ItemWrapper key={label}>
          <ItemLabel>{label}</ItemLabel>
          <ItemValue>{value}</ItemValue>
        </ItemWrapper>
      })}
    </ItemContainer>
  </CardWrapper>;
};
