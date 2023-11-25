// /* eslint-disable react/jsx-key */

// import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table';
// const AllParcels = () => {
//      const columns = [
//           {
//             Header: 'ID',
//             accessor: 'id',
//           },
//           {
//             Header: 'Name',
//             accessor: 'name',
//           },
//           {
//             Header: 'Job',
//             accessor: 'job',
//           },
//           {
//             Header: 'Favorite Color',
//             accessor: 'color',
//           },
//         ];
      
//         const data = [
//           {
//             id: 1,
//             name: 'Cy Ganderton',
//             job: 'Quality Control Specialist',
//             color: 'Blue',
//           },
//           // More data...
//         ];
      
//         const {
//           getTableProps,
//           getTableBodyProps,
//           headerGroups,
//           prepareRow,
//           page,
//           state: { pageIndex, pageSize, globalFilter },
//           setGlobalFilter,
//           gotoPage,
//           nextPage,
//           previousPage,
//           canPreviousPage,
//           canNextPage,
//           pageCount,
//           pageOptions,
//           setPageSize,
//         } = useTable(
//           {
//             columns,
//             data,
//             initialState: { pageIndex: 0, pageSize: 10 }, // Initial page size and index
//           },
//           useFilters,
//           useGlobalFilter,
//           usePagination
//         );



//      return (
//           <div>
//           {/* Global Search */}
//           <input
//             value={globalFilter || ''}
//             onChange={(e) => setGlobalFilter(e.target.value || undefined)}
//             placeholder="Search..."
//           />
    
//           {/* Table */}
//           <table {...getTableProps()} className="table">
//             {/* Table Header */}
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr  {...headerGroup.getHeaderGroupProps()}>
//                   {headerGroup.headers.map((column) => (
//                     <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             {/* Table Body */}
//             <tbody {...getTableBodyProps()}>
//               {page.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr  {...row.getRowProps()}>
//                     {row.cells.map((cell) => (
//                       <td  {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
    
//           {/* Pagination */}
//           <div>
//             <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
//             {/* Other pagination controls */}
//             <span>
//               Page {pageIndex + 1} of {pageOptions.length}
//             </span>
//             {/* Other pagination controls */}
//           </div>
//         </div>
//      );
// };

// export default AllParcels;


const AllParcels = () => {
     return (
          <div>
               
          </div>
     );
};

export default AllParcels;