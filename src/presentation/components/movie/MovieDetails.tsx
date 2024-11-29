/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FullMovie } from '../../../core/entities/movie.entitie';
import { View, Text, FlatList } from 'react-native';
import { Formatter } from '../../../config/helpers/formatter';
import { Cast } from '../../../core/entities/cast.entity';
import { CastActor } from '../cast/CastActor';

interface Props {
    movie: FullMovie
    cast: Cast[]
}
export const MovieDetails = ({movie, cast}: Props) => {
  return (
    <>
    <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'grey'}}>{movie.rating}</Text>

            <Text style={{color: 'grey', marginLeft: 5}}>- {movie.genres.join(', ')}</Text>
        </View>

        <Text style={{color: 'black', fontSize: 23, marginTop: 10, fontWeight:'bold'}}>
        Historia
        </Text>
        <Text style={{color: 'black', fontSize:16}}>{movie.description}</Text>

        <Text style={{color: 'black', fontSize: 23, marginTop: 10, fontWeight:'bold'}}>
        Presupuesto
        </Text>

        <Text style={{color: 'grey', fontSize: 18}}>
        {Formatter.currency(movie.budget)}
        </Text>
    </View>

    <View style={{ marginTop: 10, marginBottom: 50}}>
        <Text style={{
            color: 'black',
            fontSize: 23,
            marginVertical: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
        }}>
            Actores
        </Text>

        <FlatList
        data={cast}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <CastActor actor={item}/>}
/>
    </View>
    </>
  );
};
