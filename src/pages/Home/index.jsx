import React from 'react';
import Hero from './Hero';
import Competitions from './Competitions';
import Statistics from './Statistics';
import TimelineSection from './TimelineSection';
import Sponsors from './Sponsors';
import Gallery from './Gallery';
import FAQSection from './FAQSection';
import PageWrapper from '../../components/layout/PageWrapper';
import NetworkGraph from '../../components/interactive/NetworkGraph';
import FloatingShapes from '../../components/interactive/FloatingShapes';

export default function Home({ setActivePage }) {
  return (
    <PageWrapper>
      {/* Dynamic graphic layers */}
      <NetworkGraph />
      <FloatingShapes />

      {/* Structured modules rendering */}
      <Hero setActivePage={setActivePage} />
      <Competitions setActivePage={setActivePage} />
      <Statistics />
      <TimelineSection />
      <Sponsors />
      <Gallery />
      <FAQSection />
    </PageWrapper>
  );
}