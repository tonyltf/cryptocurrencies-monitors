import * as React from "react";
import styled from 'styled-components'
import styles from './flex.module.css';

const CardWrapper = styled.div<{ height?: number; width?: number; }>`
  border: 1px solid #AAA;
  padding: 1em;
  width: ${({width}) => width ? width+'px' : 'auto'};
  max-width: ${({width}) => width ? width+'px' : 'auto'};
  height: ${({height}) => height ? height+'px' : 'auto'};
`;

const CardTitle = styled.div`
  font-size: 2em;
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

const ItemValue= styled.div<{ color: string; }>`
  color: ${({ color }) => color};
`;

export const Card = ({ height, width, title, subtitle, items }: { height: number; width: number; title: string; subtitle: string; items: { label: string; value: string; color?: string; }[] }) => {
  return <CardWrapper className={styles.child} height={height} width={width}>
    <CardTitle>{title}</CardTitle>
    <CardSubtitle>{subtitle}</CardSubtitle>
    <ItemContainer className={styles.parent}>
      {items?.map(({ label, value, color }) => {
        return <ItemWrapper key={label} className={styles.child}>
          <ItemLabel>{label}</ItemLabel>
          <ItemValue color={color || 'black'}>{value}</ItemValue>
        </ItemWrapper>
      })}
    </ItemContainer>
  </CardWrapper>;
};
