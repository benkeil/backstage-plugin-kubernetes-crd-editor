import React, { useEffect, useState } from 'react';
import {
  Content,
  ContentHeader,
  Header,
  HeaderLabel,
  Page,
  SupportButton,
} from '@backstage/core-components';
import { MockCrdRepository } from '../../adapters/MockCrdRepository';
import { CrdRepository } from '../../domain/repositories/CrdRepository';
import { CrdComponent } from '../CrdComponent/CrdComponent';
import { CustomResourceDefinition } from '../../domain/data/CustomResourceDefinition';

export const CrdEditorComponent = () => {
  const [crd, setCrd] = useState<CustomResourceDefinition | undefined>();

  useEffect(() => {
    const crdRepository: CrdRepository = new MockCrdRepository();
    setCrd(crdRepository.load());
  }, []);

  return (
    <Page themeId="tool">
      <Header
        title="Welcome to kubernetes-crd-editor!"
        subtitle="Optional subtitle"
      >
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="CRD Editor">
          <SupportButton>A description of your plugin goes here.</SupportButton>
        </ContentHeader>
        {crd && <CrdComponent crd={crd} />}
      </Content>
    </Page>
  );
};
