import Header from '@/components/Header';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <View>
        <Text>Home</Text>
        <Link href={'/List/'}>ir para lista</Link>
      </View>
    </>
  );
};

export default Home;

