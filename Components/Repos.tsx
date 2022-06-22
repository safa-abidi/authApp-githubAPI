import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
import {Octokit} from '@octokit/core';
import {TextInput, Button, RadioButton} from 'react-native-paper';
import {styles} from '../commonStyles';
import {useForm, Controller} from 'react-hook-form';
import moment from 'moment';

export const Repos = () => {
  const [direction, setDirection] = useState('asc');
  const [checked, setChecked] = useState('created');
  const [org, setOrg] = useState('');
  const fetchRepos = async (organi, sortingBy, dir) => {
    const octokit = new Octokit({
      auth: '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',
    });
    const res = await octokit.request('GET /orgs/{org}/repos', {
      org: organi,
      sort: sortingBy,
      direction: dir,
    });
    return res;
  };
  const {data, isLoading, isSuccess, refetch} = useQuery(
    ['repos', org, checked, direction],
    ({queryKey}) => fetchRepos(queryKey[1], queryKey[2], queryKey[3]),
    {enabled: true},
  );

  const {control, handleSubmit} = useForm({
    defaultValues: {
      organization: '',
    },
  });
  const onSubmit = donne => {
    setOrg(donne.organization);
    refetch();
  };

  return (
    <>
      <View style={RepoStyles.searchForm}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Organization ... "
              activeOutlineColor="#008080"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="organization"
        />
        <Button
          style={styles.button}
          mode="contained"
          color="#008080"
          onPress={handleSubmit(onSubmit)}>
          Search Repos
        </Button>
      </View>
      <Text style={RepoStyles.title}>Sort repos by : </Text>
      <View style={{flexDirection: 'row'}}>
        <RadioButton.Group
          onValueChange={newValue => setChecked(newValue)}
          value={checked}>
          <View style={RepoStyles.radio}>
            <Text style={RepoStyles.text}>Created at</Text>
            <RadioButton value="created" color="teal" />
          </View>
          <View style={RepoStyles.radio}>
            <Text style={RepoStyles.text}>Updated at</Text>
            <RadioButton value="updated" color="teal" />
          </View>
          <View style={RepoStyles.radio}>
            <Text style={RepoStyles.text}>Pushed at</Text>
            <RadioButton value="pushed" color="teal" />
          </View>
          <View style={RepoStyles.radio}>
            <Text style={RepoStyles.text}>Full Repo name</Text>
            <RadioButton value="full_name" color="teal" />
          </View>
        </RadioButton.Group>
      </View>
      <Text style={RepoStyles.title}>Direction : </Text>
      <View>
        <RadioButton.Group
          onValueChange={newValue => setDirection(newValue)}
          value={direction}>
          <View style={RepoStyles.radio}>
            <Text style={RepoStyles.text}>Asc</Text>
            <RadioButton value="asc" color="teal" />
          </View>
          <View style={RepoStyles.radio}>
            <Text style={RepoStyles.text}>Desc</Text>
            <RadioButton value="desc" color="teal" />
          </View>
        </RadioButton.Group>
      </View>
      <View style={RepoStyles.container}>
        {isLoading && (
          <React.Fragment>
            <Text style={RepoStyles.text}>Loading...</Text>
          </React.Fragment>
        )}

        {!isLoading && !data && <Text style={RepoStyles.text}>Search for something</Text>}
        {!isLoading && org !== '' && !data && (
          <Text style={styles.erreur}>No results found</Text>
        )}
        {isSuccess && (
          <View>
            <Text style={RepoStyles.header}>Repos</Text>
            <FlatList
              data={data.data}
              keyExtractor={item => `${item.id}`}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => console.log('pressed')}
                  style={RepoStyles.repo}>
                  <View style={RepoStyles.item}>
                    <Text style={RepoStyles.text}>Name: {item.name}</Text>
                    <Text style={RepoStyles.text}>
                      Created at :{' '}
                      {moment(item.created_at).format('DD/MM/YYYY')}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </>
  );
};

const RepoStyles = StyleSheet.create({
  searchForm: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  radio: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  container: {
    width: '100%',
    padding: 10,
  },
  item: {
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  header: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000',
    paddingBottom: 10,
  },
  repo: {
    backgroundColor: '#dcdcdc',
    padding: 5,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {color: '#000'},
  title: {
    color: '#888',
    fontSize: 16,
    paddingLeft: 10,
  },
});
