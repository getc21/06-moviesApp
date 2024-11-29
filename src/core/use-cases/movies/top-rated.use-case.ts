import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { TopRatedResponse } from '../../../infraestructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infraestructure/mappers/movie.mapper';
import { Movie } from '../../entities/movie.entitie';

export const moviesTopRatedUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {

    try {
        const topRated = await fetcher.get<TopRatedResponse>('/top_rated');

        return  topRated.results.map(result => MovieMapper.fromMovieDBResultToEntity(result));


    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - topRated');
    }
};
