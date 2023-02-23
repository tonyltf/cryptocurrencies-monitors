import * as React from "react";
export const Card = ({ title, subtitle, content }: { title: string; subtitle: string; content: React.ReactNode }) => {
  return <div>
    <div>{title}</div>
    <div>{subtitle}</div>
    {content}
  </div>;
};
