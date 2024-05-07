import Button from '@/components/Button';
import Header from '@/components/Header';
import { List as ListContainer } from '@/components/List';
import ListItem from '@/components/ListItem';
import { theme } from '@/theme';
import { currencyFormat } from '@/utils/format';
import { ShoppingList as ShoppingListValue } from '@/utils/List';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

const List: React.FC = () => {
  const { id } = useLocalSearchParams();

  const [ShoppingList, setShoppingList] = React.useState<ShoppingListsProps>(
    ShoppingListValue[0]
  );

  // const handleLists = () => {
  //   AsyncStorage.getItem(SHOPPING_LIST_KEY).then((data) => {
  //     if (data) {
  //       const storedLists: ShoppingListsProps[] = JSON.parse(data);
  //       storedLists.filter((list) => {
  //         if (list.id === parseInt(String(1))) {
  //           setShoppingList(list);
  //         }
  //       });
  //     }
  //   });
  // };

  useEffect(() => {
    // handleLists();
  }, []);
  return (
    <>
      <Header previous />

      <View style={styles.container}>
        <Text style={styles.title}> {ShoppingList.name} </Text>

        <View style={styles.headerTitle}>
          <View
            style={{
              width: '75%',
              flexDirection: 'row',
            }}
          >
            <Text style={[styles.TextHeader, { width: '25%', marginLeft: 12 }]}>
              Item
            </Text>
            <Text style={[styles.TextHeader, { width: '15%' }]}>Qtd.</Text>
            <Text
              style={[styles.TextHeader, { width: '30%', textAlign: 'center' }]}
            >
              Preço
            </Text>
            <Text
              style={[styles.TextHeader, { width: '25%', textAlign: 'center' }]}
            >
              Total
            </Text>
          </View>
          <Text
            style={[styles.TextHeader, { width: '25%', textAlign: 'center' }]}
          >
            Ações
          </Text>
        </View>

        <ListContainer
          data={ShoppingList.items}
          ItemListComp={ListItem}
          deleteList={() => {}}
          editList={() => {}}
        />

        <View style={[styles.headerTitle, { justifyContent: 'space-between' }]}>
          <Text style={styles.TextHeader}>Total:</Text>

          <Text style={styles.TextHeader}>
            {currencyFormat(ShoppingList.total)}
          </Text>
        </View>

        <View>
          <Button
            label='SALVAR LISTA'
            backgroundColor={theme.colors.blue}
            labelColor={theme.colors.light}
            onPress={() => {}}
            icon={
              // loading ? (
              //   <ActivityIndicator color={theme.colors.light} />
              // ) : (
              <MaterialCommunityIcons
                name={'send'}
                size={30}
                color={theme.colors.light}
              />
              // )
            }
          />
        </View>
      </View>
    </>
  );
};

export default List;

