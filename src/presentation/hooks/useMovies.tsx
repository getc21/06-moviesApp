import { useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entitie';

import * as UseCases from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1;
export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upComing, setUpComing] = useState<Movie[]>([]);
    useEffect(() => {
        initialLoad();
    }, []);

    const initialLoad = async () => {
        const nowPlayingPromise =  UseCases.moviesNowPlayingUseCase(movieDBFetcher);
        const upComingPromise =  UseCases.moviesUpComingUseCase(movieDBFetcher);
        const topRatedPromise =  UseCases.moviesTopRatedUseCase(movieDBFetcher);
        const popularPromise =  UseCases.moviesPopularUseCase(movieDBFetcher);

        const [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upComingMovies,
        ] = await Promise.all([
            nowPlayingPromise,
            upComingPromise,
            topRatedPromise,
            popularPromise,
        ]);

        setNowPlaying( nowPlayingMovies );
        setPopular(popularMovies);
        setTopRated(topRatedMovies);
        setUpComing(upComingMovies);

        setIsLoading(false);
    };
    return{
        isLoading,
        nowPlaying,
        popular,
        upComing,
        topRated,

        //Methods
        popularNextPage: async() => {
            popularPageNumber++;
            const popularMovies = await UseCases.moviesPopularUseCase(movieDBFetcher, {
                page: popularPageNumber,
            });

            setPopular( prev => [...prev, ...popularMovies]);
        },
    };
};
