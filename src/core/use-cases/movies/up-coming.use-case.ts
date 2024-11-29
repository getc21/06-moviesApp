import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { UpComingResponse } from '../../../infraestructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infraestructure/mappers/movie.mapper';
import { Movie } from '../../entities/movie.entitie';

export const moviesUpComingUseCase = async (fetcher: HttpAdapter): Promise<Movie[]> => {

    try {
        const upComing = await fetcher.get<UpComingResponse>('/upcoming');

        return  upComing.results.map(result => MovieMapper.fromMovieDBResultToEntity(result));


    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - upComing');
    }
};
