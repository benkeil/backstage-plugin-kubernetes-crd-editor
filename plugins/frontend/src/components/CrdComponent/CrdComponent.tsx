import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  CustomResourceDefinition,
  CustomResourceDefinitionVersion,
} from '../../domain/data/CustomResourceDefinition';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Typography,
} from '@material-ui/core';
import { InfoCard } from '@backstage/core-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Code } from '../CodeComponent/Code';
import { CrdVersionComponent } from '../CrdVersionComponent/CrdVersionComponent';

export interface CrdComponentProperties {
  crd: CustomResourceDefinition;
}

export const CrdComponent = ({ crd }: CrdComponentProperties) => {
  const [selectedVersion, setSelectedVersion] = useState<string | undefined>();
  const [version, setVersion] = useState<
    CustomResourceDefinitionVersion | undefined
  >();
  const selectVersion = (
    event: ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    setSelectedVersion(`${event.target.value}`);
  };
  useEffect(() => {
    const v = crd.spec.versions?.filter(
      ver => ver.name === selectedVersion,
    )[0]!;
    setVersion(v);
  }, [crd, selectedVersion]);

  return (
    <>
      <Grid item>
        <InfoCard
          title={`${crd.spec.names.kind}.${crd.spec.group}`}
          subheader={
            crd.spec.scope === 'Namespaced' && <Chip label="namespaced" />
          }
        >
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel htmlFor="version">API Version</InputLabel>
            <Select
              native
              value={selectedVersion}
              onChange={selectVersion}
              inputProps={{
                name: 'version',
                id: 'version',
              }}
            >
              <option aria-label="None" value="" />
              {crd.spec.versions?.map(ver => (
                <option key={ver.name} value={ver.name}>
                  {ver.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </InfoCard>
      </Grid>
      {version && <CrdVersionComponent version={version} />}
      <Grid item>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Manifest as JSON</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Code data={crd} />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
};
