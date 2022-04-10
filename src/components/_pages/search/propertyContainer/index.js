import { Box, Pagination, PaginationItem } from '@mui/material';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import useQuery from '../../../../helpers/hooks/useQuery';
import PropertyAPI from '../../../../helpers/api/property';
import formatErrorResponse from '../../../../helpers/utils/formatErrorResponse';
import Loader from '../../../_common/loader';
import ErrorPage from '../../../_common/errorPage';

import PropertyList from '../propertyList';
import { Link } from 'react-router-dom';

const PAGE_LIMIT = 5;

function getInfoFromQuery(query) {
  return {
    keyword: query.get('keyword'),
    district: query.get('district'),
    propertyType: query.get('propertyType') || 'S',
    minPrice: query.get('minPrice'),
    maxPrice: query.get('maxPrice'),
    minArea: query.get('minArea'),
    maxArea: query.get('maxArea'),
  };
}

export default function PropertySearchContainer() {
  const query = useQuery();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const queryPage = Number.parseInt(query.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(queryPage);
  const [pages, setPages] = useState(1);

  if (queryPage !== currentPage) {
    setCurrentPage(queryPage);
  }

  useEffect(() => {
    const queryInfo = getInfoFromQuery(query);
    setLoading(true);
    PropertyAPI.searchProperty(PAGE_LIMIT, currentPage - 1, queryInfo)
      .then((result) => {
        if (!result.data.success) {
          throw new Error(result.data.message);
        }
        const data = result.data.data;
        setProperties(data.properties);
        const newPages = Math.ceil(data.totalCount / PAGE_LIMIT) || 1;
        setPages(newPages);
      })
      .catch((error) => {
        let res = formatErrorResponse(error);
        toast.error(res.message);
        setProperties([]);
        setPages(1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, query]);

  if (loading) {
    return (
      <Box>
        <Loader />
      </Box>
    );
  }

  if (properties.length === 0) {
    return (
      <ErrorPage
        message='(Không có kết quả phù hợp)'
        backToHome={false}
        minHeight='50vh'
      />
    );
  }

  const paginationItemRenderer = renderPaginationItem(query);

  return (
    <>
      <PropertyList properties={properties} />
      <Box m={2} display='flex' justifyContent='flex-end'>
        <Pagination
          page={currentPage}
          count={pages}
          variant='outlined'
          shape='rounded'
          renderItem={paginationItemRenderer}
        />
      </Box>
    </>
  );
}

const renderPaginationItem = (query) => {
  const render = (item) => {
    const search = new URLSearchParams(query);
    search.set('page', item.page);
    return (
      <PaginationItem
        component={Link}
        to={{
          search: search.toString(),
        }}
        {...item}
      />
    );
  };

  return render;
};
