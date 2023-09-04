import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { MockCrdRepository } from '../../adapters/MockCrdRepository';
import { InfoCard } from '@backstage/core-components';
import { FormControl, Grid, InputLabel, Select } from '@material-ui/core';
import { CustomResourceDefinition } from '../../domain/data/CustomResourceDefinition';
import { CrdComponent } from '../CrdComponent/CrdComponent';

export interface CrdSelectorComponentProperties {}

export const CrdSelectorComponent = ({}: CrdSelectorComponentProperties) => {
  const crds = useMemo(() => {
    const crdRepository = new MockCrdRepository();
    return crdRepository.load();
  }, []);

  const [selectedCrd, setSelectedCrd] = useState<string | undefined>();
  const [crd, setCrd] = useState<CustomResourceDefinition | undefined>();

  const selectCrd = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    setSelectedCrd(`${event.target.value}`);
  };

  useEffect(() => {
    setCrd(crds.filter(c => c.spec.names.kind === selectedCrd)[0]!);
  }, [crds, selectedCrd]);

  return (
    <>
      <Grid item>
        <InfoCard title="Select your CRD">
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel htmlFor="crd">CRD</InputLabel>
            <Select
              native
              value={selectedCrd}
              onChange={selectCrd}
              inputProps={{
                name: 'crd',
                id: 'crd',
              }}
            >
              <option aria-label="None" value="" />
              {crds.map(resource => (
                <option
                  key={resource.spec.names.kind}
                  value={resource.spec.names.kind}
                >
                  {resource.spec.names.kind}
                </option>
              ))}
            </Select>
          </FormControl>
        </InfoCard>
      </Grid>
      {crd && <CrdComponent crd={crd} />}
    </>
  );
};
