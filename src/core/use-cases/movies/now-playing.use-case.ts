import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { NowPlayingResponse } from '../../../infraestructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infraestructure/mappers/movie.mapper';
import { Movie } from '../../entities/movie.entitie';

export const moviesNowPlayingUseCase = async (
    fetcher: HttpAdapter
): Promise<Movie[]> => {

    try {
        const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing');

        return  nowPlaying.results.map(result => MovieMapper.fromMovieDBResultToEntity(result));


    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - nowPlaying');
    }
};
