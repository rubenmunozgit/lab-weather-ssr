import { getSearchWithCache } from '../middleware/cache';
import transformSearchedLocations from '../transforms/searchTransform';

const DEFAULT_LIMIT = 5;

const searchLocationHandler = async (req, res, next) => {
  try {
    const { lang = 'en', limit = DEFAULT_LIMIT, q } = req.query;
    if (!q) throw Error('query or lang must be defined');

    const { searchResults, searchError } = await getSearchWithCache({
      lang,
      limit: limit > DEFAULT_LIMIT ? DEFAULT_LIMIT : limit,
      q,
    });
    if (searchError) {
      throw Error(JSON.stringify(searchError));
    }

    const response = transformSearchedLocations(searchResults, lang);
    res.send(response);
  } catch (error) {
    console.log('server: ' + error);
    next(error);
  }
};

export default searchLocationHandler;
