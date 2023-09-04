import React from 'react';
import {
  Content,
  ContentHeader,
  Header,
  HeaderLabel,
  Page,
  SupportButton,
} from '@backstage/core-components';
import { CrdSelectorComponent } from '../CrdSelectorComponent/CrdSelectorComponent';
import { Grid } from '@material-ui/core';

export const CrdEditorComponent = () => {
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
        <Grid container spacing={3} direction="column">
          <CrdSelectorComponent />
        </Grid>
      </Content>
    </Page>
  );
};
