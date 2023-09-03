import { CustomResourceDefinitionVersion } from '../../domain/data/CustomResourceDefinition';
import { Grid, Typography } from '@material-ui/core';
import { InfoCard } from '@backstage/core-components';
import React, { useMemo } from 'react';
import { Code } from '../Code/Code';
import Form from '@rjsf/material-ui';
import validator from '@rjsf/validator-ajv8';

export interface CrdVersionComponentProperties {
  version: CustomResourceDefinitionVersion;
  debug?: boolean;
}

const log = (type: string) => console.log.bind(console, type);

export const CrdVersionComponent = ({
  version,
  debug,
}: CrdVersionComponentProperties) => {
  const schema = useMemo(() => {
    return version.schema!.openAPIV3Schema;
  }, [version.schema]);

  return (
    <Grid item>
      <InfoCard title={version.name}>
        {debug && (
          <Typography variant="body2">
            <Code data={schema} />
          </Typography>
        )}
        <Form
          // @ts-ignore IDE bug
          validator={validator}
          schema={schema}
          onChange={log('changed')}
          onSubmit={log('submitted')}
          onError={log('errors')}
        />
      </InfoCard>
    </Grid>
  );
};
