import React from 'react';

export interface CodeProperties {
  data: any;
}

export const Code = ({ data }: CodeProperties) => (
  <pre>
    <code>{JSON.stringify(data, null, 2)}</code>
  </pre>
);
