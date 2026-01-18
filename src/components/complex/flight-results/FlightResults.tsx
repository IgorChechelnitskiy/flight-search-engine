import { useMemo, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cs from './FlightResults.module.scss';

interface FlightOffer {
  id: string;
  price: { total: string; currency: string };
  itineraries: any[];
  validatingAirlineCodes: string[];
}

const columnHelper = createColumnHelper<FlightOffer>();

export function FlightResults({ data }: { data: FlightOffer[] }) {
  // 1. Re-introduce the pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // 2. Use your ORIGINAL working columns
  const columns = useMemo(
    () => [
      columnHelper.accessor('validatingAirlineCodes', {
        header: 'Airline',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <div className={cs.airlineBadge}>{info.getValue()[0]}</div>
            <span className="font-medium text-slate-700">
              Airline {info.getValue()[0]}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor(
        (row) => row.itineraries[0].segments[0].departure.at,
        {
          id: 'departure',
          header: 'Schedule',
          cell: (info) => (
            <div className="flex flex-col">
              <span className="font-bold text-slate-900">
                {new Date(info.getValue()).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">
                Departure
              </span>
            </div>
          ),
        }
      ),
      columnHelper.accessor((row) => row.itineraries[0].duration, {
        id: 'duration',
        header: 'Duration',
        cell: (info) => info.getValue().replace('PT', '').toLowerCase(),
      }),
      columnHelper.accessor('price.total', {
        header: 'Fare',
        cell: (info) => (
          <div className="flex flex-col items-start">
            <span className={cs.priceText}>
              {info.row.original.price.currency}{' '}
              {parseFloat(info.getValue()).toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">
              Incl. taxes & fees
            </span>
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: () => <div className="text-center">Action</div>, // Center header text too
        cell: () => (
          <div className={cs.actionCell}>
            <button className={cs.bookButton}>Select</button>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Required!
  });

  if (!data || data.length === 0) return null;

  return (
    <section className={cs.resultsWrapper} aria-label="Flight search results">
      <div className={cs.tableContainer}>
        <table className={cs.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {/* table.getRowModel().rows automatically handles the pagination slice (e.g. 0-10) */}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={cs.tableRow}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* 3. Re-introduce the Pagination Controls */}
        {/* Pagination Controls */}
        <div className={cs.pagination}>
          <div className={cs.pageStatus}>
            <span className={cs.statusLabel}>Showing</span>
            <span className={cs.statusValue}>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              {' - '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                data.length
              )}
            </span>
            <span className={cs.statusLabel}>of</span>
            <span className={cs.statusValue}>{data.length}</span>
            <span className={cs.statusLabel}>flights</span>
          </div>

          <div className={cs.navButtonGroup}>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={cs.paginationBtn}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
              <span>Previous</span>
            </button>

            <div className={cs.pageIndicator}>
              {table.getState().pagination.pageIndex + 1} /{' '}
              {table.getPageCount()}
            </div>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={cs.paginationBtn}
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
