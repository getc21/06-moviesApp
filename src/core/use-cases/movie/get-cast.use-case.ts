import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { MovieDBCastResponse } from '../../../infraestructure/interfaces/movie-db.responses';
import { CastMapper } from '../../../infraestructure/mappers/cast.mapper';
import { Cast } from '../../entities/cast.entity';

export const getMovieCastUseCase = async (fetcher: HttpAdapter, movieId: number): Promise<Cast[]> => {

    try {

        const {cast} = await fetcher.get<MovieDBCastResponse>(`/${movieId}/credits`);

        const actors = cast.map((actor) => CastMapper.fromMovieDBCastToEntity(actor));

        return actors;

    }catch (error) {
        throw new Error(`Cannot get movie cast ${movieId}`);
    }
};
