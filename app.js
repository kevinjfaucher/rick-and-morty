import React, { Component } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';

class RickMortyApp extends Component {
  state = {
    characterName: "",
    characterData: null,
    error: null,
  };

  handleInputChange = (text) => {
    this.setState({ characterName: text });
  };

  fetchCharacterData = () => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${this.state.characterName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.results && data.results.length > 0) {
          this.setState({ characterData: data.results[0], error: null });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        this.setState({ error: "Failed to fetch character data or character not found" });
      });
  };

  render() {
    const { characterName, characterData, error } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Rick and Morty App</Text>
        <TextInput
          style={styles.input}
          value={characterName}
          onChangeText={this.handleInputChange}
          placeholder="Enter character name"
        />
        <Button title="Get Character" onPress={this.fetchCharacterData} />
        {error && <Text style={styles.error}>{error}</Text>}
        {characterData && (
          <View style={styles.characterData}>
            <Image source={{ uri: characterData.image }} style={styles.image} />
            <Text style={styles.name}>{characterData.name}</Text>
            <Text>Status: {characterData.status}</Text>
            <Text>Species: {characterData.species}</Text>
            <Text>Gender: {characterData.gender}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  characterData: {
    alignItems: 'center',
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  }
});

export default RickMortyApp;
